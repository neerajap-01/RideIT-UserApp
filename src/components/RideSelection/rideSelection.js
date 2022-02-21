import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import RideSelectionRows from "../RideSelectionRows/rideSelectionRows";
import typesdata from "../../assets/data/types";

const RideSelection = ({ typeState , onSubmit, getData}) => {
  const [selectedType, setSelectedType] = typeState;
  return (
      <View>
        {typesdata.map(type => (
            <RideSelectionRows
                sendData={getData}
                type={type}
                key={type.id}
                isSelected={type.type === selectedType}
                onPress={() => setSelectedType(type.type)}
            />
        ))}
        <Pressable onPress={onSubmit} style={styles.confirm}>
          <Text style={styles.text}>
            Confirm Ride
          </Text>
        </Pressable>
      </View>
  );
};

export default RideSelection;
