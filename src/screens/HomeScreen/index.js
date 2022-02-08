import React from "react";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import HomeMap from "../../components/HomeMap/homemap";
import CovidMessage from "../../components/CovidMessage/covidmsg";
import HomeSearch from "../../components/HomeSearch/homesearch";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";

const HomeScreen = props => {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ flex: 2 }]}>
          <Pressable onPress={() => navigation.openDrawer()}
                     style={[styles.roundButton, {top: 10, left: 10, zIndex: 9999}]}>
            <Entypo name={"menu"} size={24} color={"#4a4a4a"}/>
          </Pressable>
          <HomeMap />
      </View>
      {/*Covid Message*/}
      <CovidMessage />
      {/*Bottom Comp*/}
      <View>
        <HomeSearch />
      </View>
    </View>
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
export default HomeScreen;
