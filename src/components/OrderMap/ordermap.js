import React from "react";
import { Image } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const OrderMap = ({ car }) => {

    const getImage = (type) => {
        if (type === 'Car') {
            return require('../../assets/images/top-car.png');
        }
        if (type === 'Bike') {
            return require('../../assets/images/top-bike.png');
        }
        return require('../../assets/images/top-scooty.png');
    };

    return (
        <MapView
            style={{width: '100%', height: '100%'}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 60,
                longitudeDelta: 10,
            }}>
            {car && (<Marker
                key={car.id}
                coordinate={{latitude: car.latitude, longitude: car.longitude}}
            >
                <Image
                    style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                        transform: [{
                            rotate: `${car.heading}deg`
                        }]
                    }}
                    source={getImage(car.type)}
                />
            </Marker>)}
        </MapView>
    );
};

export default OrderMap;
