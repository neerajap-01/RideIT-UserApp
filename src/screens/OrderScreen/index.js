import React, {useEffect, useState} from "react";
import {StyleSheet, View, Pressable, Text, Alert, ToastAndroid} from "react-native";
import OrderMap from "../../components/OrderMap/ordermap";
import {StackActions, useNavigation, useRoute} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {getOrder, getCar} from "../../graphql/queries";
import {onCarUpdated, onOrderUpdated} from "./subscription";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const OrderScreen = props => {
    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);
    const [details, setDetails] = useState(null);
    const navigation = useNavigation();

    const route = useRoute();
    //console.warn(route.params.id);
    // Fetch order on initial render
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await API.graphql(
                    graphqlOperation(getOrder, { id: route.params.id })
                );
                //console.warn(orderData);
                setOrder(orderData.data.getOrder);
            } catch (e) {
                console.error(e);
            }
        }
        //setInterval(() => fetchOrder(), 10000);
        fetchOrder();
    }, []);

    //subscribe to order-update
    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onOrderUpdated, { id: route.params.id })
        ).subscribe({
            next: ({  value }) => setOrder(value.data.onOrderUpdated),
            error: error => console.warn(error)
        })
        return () => subscription.unsubscribe();
    },[])

    useEffect(() => {
        if (!order?.carId || order.carId === '1') {
            return;
        }
        //fetch car data when order updated
        const fetchCar = async () => {
            try {
                const carData = await API.graphql(
                    graphqlOperation(getCar, { id: order.carId })
                );
                setDetails(carData.data.getCar.user);
                setCar(carData.data.getCar);
            } catch (e) {
                console.error(e);
            }
        }
        fetchCar();
    }, [order]);

    //subscribe to car-update
    useEffect(() => {
        if (!order?.carId || order.carId === '1') {
            return;
        }
        const subscription = API.graphql(
            graphqlOperation(onCarUpdated, { id: order.carId })
        ).subscribe({
            next: ({  value }) => setCar(value.data.onCarUpdated),
            error: error => console.warn(error)
        })

        return () => subscription.unsubscribe();
    },[order]);

    const renderBottomTitle = () => {
        if(order?.status === 'NEW') {
            return (
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 200, padding: 10,}}>
                    <Text style={{color: 'black', fontWeight:'900', fontSize: 20, marginBottom: -5}}>PENDING</Text>
                    <Text style={{color: 'black', fontWeight:'900', fontSize: 20, marginBottom: -10}}>------------</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Order Status</Text>
                </View>
            )
        }
        if(order?.status === 'DROPPING OFF') {
            navigation.dispatch(StackActions.replace('OrderCompletePage'));
        }
        else {
            return (
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 300,}}>
                    <Text style={{color: 'black', flexDirection: "row", fontWeight:'900', fontSize: 20, marginBottom: -5}}>{order?.status}</Text>
                    <Text style={{color: 'black', fontWeight:'900', fontSize: 20, marginBottom: -10}}>------------</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Order Status</Text>
                </View>
            )
        }

    }

    const fetchDetails = () => {
      if(details === null) {
          Alert.alert("Order Pending...", "Your order has not yet been accepted by any driver, Please wait for sometime and Try again later");
      } else {
          Alert.alert("Driver details", "ID no.:- "+details.id+", "+"E-mail Address:- "+details.email+", "+"Username:- "+details.username+".");
      }
    };
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ flex: 2 }]}>
          <OrderMap car={car}/>
      </View>
    {/*<View>*/}
    {/*
    {/*</View>*/}
    <View style={styles.bottomContainer}>
        <Pressable onPress={fetchDetails}>
            <Entypo name={"shield"} size={30} color={"#4a4a4a"}/>
        </Pressable>
        {renderBottomTitle()}
        <Pressable onPress={showToastWithGravityAndOffset}>
            <Entypo name={"list"} size={30} color={"#4a4a4a"}/>
        </Pressable>

    </View>
    </View>
  );
};
const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
        "Coming soon",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
    );
};
const styles = StyleSheet.create({
    bottomContainer: {
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    orderStat: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    orderStatText: {
        fontSize: 25,
        color: 'black',
        fontWeight: "600",
    }
});

export default OrderScreen;
