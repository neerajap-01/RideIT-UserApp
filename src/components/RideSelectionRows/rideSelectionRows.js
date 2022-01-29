import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import styles from "./styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const RideSelectionRows = props => {
    const { type, onPress, isSelected } = props;

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
                <Text style={styles.time}>8.03AM drop off</Text>
            </View>

            <View style={styles.rightContainer}>
                <Ionicons name={"pricetag"} size={18} color={"#42d742"} />
                <Text style={styles.price}>est. ₹{type.price}</Text>
            </View>
        </Pressable>
    );
};

export default RideSelectionRows;
