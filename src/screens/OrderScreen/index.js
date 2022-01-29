import React, {useEffect, useState} from "react";
import {StyleSheet, View, Pressable, Text} from "react-native";
import OrderMap from "../../components/OrderMap/ordermap";
import {useRoute} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {getOrder, getCar} from "../../graphql/queries";
import {onCarUpdated, onOrderUpdated} from "./subscription";

const OrderScreen = props => {
    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);

    const route = useRoute();
    console.warn(route.params.id);
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
                console.warn(carData);
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

  return (
    <View style={{ flex: 1 }}>
      <View style={[{ flex: 2 }]}>
          <OrderMap car={car}/>
      </View>
    <View>
        <Text>Order status: {order?.status} </Text>
    </View>
    </View>
  );
};

export default OrderScreen;
