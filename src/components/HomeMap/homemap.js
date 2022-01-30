import React from 'react';
import {Alert, Image, Pressable, StyleSheet, ToastAndroid, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { API, graphqlOperation } from 'aws-amplify';
import { listCars } from './queries'
import FontAwesome from "react-native-vector-icons/FontAwesome";

navigator.geolocation = require('@react-native-community/geolocation');

export default class Map extends React.Component {
  constructor(props) {
    Alert.alert("Important", "You have to press refresh icon in order to see the updated location of cars.");
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      coordinates: [],
      marginBottom: 1,
      cars: [],
    };
  }

  async componentDidMount() {
    const fetchCars = async () => {
      try {
        const response = await API.graphql(
            graphqlOperation(
                listCars,
                { filter: { isActive: { eq: "True" } } }
            )
        )
        this.setState({
          cars: response.data.listCars.items,
        });
      } catch (e) {
        console.error(e);
      }
    };
    //setInterval(() => fetchCars() , 4000);
    fetchCars();
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: false,
        timeout: 20000,
      },
    );

    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: false,
        timeout: 20000,
        distanceFilter: 10,
      },
    );
  }
  render() {
    const getImage = type => {
      if (type === 'Car') {
        return require('../../assets/images/top-car.png');
      }
      if (type === 'Bike') {
        return require('../../assets/images/top-bike.png');
      }
      return require('../../assets/images/top-scooty.png');
    };

    return (
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1, marginBottom: this.state.marginBottom}}
          showsMyLocationButton={true}
          showsCompass={true}
          zoomEnabled={true}
          showsUserLocation={true}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0155,
            longitudeDelta: 0.0153,
          }}
          onMapReady={() => {
            this.setState({marginBottom: 0});
          }}>
          <Circle
            center={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            radius={300}
            strokeWidth={2}
            strokeColor={'rgba(102,156,247,0.79)'}
            fillColor={'rgba(96,151,245,0.40)'}
          />
          {this.state.cars.map(car => (
            <Marker
              key={car.id}
              coordinate={{
                latitude: car.latitude,
                longitude: car.longitude,
              }}>
              <Image
                style={{
                  width: 50,
                  height: 70,
                  resizeMode: 'contain',
                  transform: [
                    {
                      rotate: `${car.heading}deg`,
                    },
                  ],
                }}
                source={getImage(car.type)}
              />
            </Marker>
          ))}
        </MapView>
        <Pressable onPress={() => {
            this.componentDidMount();
            showToastWithGravityAndOffset();
        }}
                   style={[styles.roundButton, {bottom: 10, right: 10}]}>
          <FontAwesome name={"refresh"} size={24} color={"#4a4a4a"}/>
        </Pressable>
      </View>
    );
  }
}
const showToastWithGravityAndOffset = () => {
  ToastAndroid.showWithGravityAndOffset(
      "Refreshing...",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
  );
};
const styles = StyleSheet.create({
  roundButton: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
});
