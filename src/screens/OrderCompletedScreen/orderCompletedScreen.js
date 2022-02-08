import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import LottieView from "lottie-react-native";
import {Auth} from "aws-amplify";
import {StackActions, useNavigation} from "@react-navigation/native";


const OrderCompletedScreen = props => {
    const navigation = useNavigation();
  return (
    <View style={styles.root}>
        <View>
            <Text style={styles.info}>
                  Destination reached
            </Text>
        </View>
        <LottieView
            autoSize
            autoPlay
            speed={0.8}
            loop
            source={require('../../../assets/lottieFiles/OrderCompleted.json')}
        />
        <View>
            <Text style={styles.thank}>
                Thank You for using our RideIT App
            </Text>
        </View>
        <Pressable
            onPress={() =>  navigation.dispatch(StackActions.replace('Root'))}
            style={styles.container}
        >
            <Text
                style={styles.text}>
                HOME
            </Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 130,
        padding: 10,
    },
    thank: {
        paddingTop: -20,
        padding: 20,
        fontWeight: '600',
    },
    info: {
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        fontSize: 35,
        fontWeight: '600',
        color: '#111111',
    },
    container: {
        width: '40%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,

        borderColor: '#3B71F3',
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },

});

export default OrderCompletedScreen;
