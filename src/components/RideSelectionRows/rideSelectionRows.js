import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import styles from "./styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";

const RideSelectionRows = props => {
    const { type, onPress, isSelected, sendData} = props;
    const getImage = () => {
        if (type.type === "Car") {
            return require("../../assets/images/car.jpeg");
        }
        if (type.type === "Bike") {
            return require("../../assets/images/bike-side.png");
        }
        return require("../../assets/images/scooty-side.png");
    };

    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: isSelected ? '#efefef' : 'white',
            }]}
        >
            {/* Image */}
            <Image style={styles.image} source={getImage()} />

            <View style={styles.middleContainer}>
                <Text style={styles.type}>
                    {type.type} <FontAwesome5 name={"user-check"} size={16} />
                </Text>
                <Text>{sendData ? <Text style={styles.time}>Distance is {sendData.distance ? sendData.distance.toFixed(1) : '?'} km's</Text> : "Loading info..."}</Text>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.price}>est: </Text>
                <Text>
                    {sendData ? <Text style={styles.duration}>{sendData.duration ? sendData.duration.toFixed(1) : '?'} min's</Text> : "Loading info..."}
                </Text>
            </View>
        </Pressable>
    );
};

export default RideSelectionRows;
