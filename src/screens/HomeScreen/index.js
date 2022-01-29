import React, {useEffect} from "react";
import {StyleSheet, View, Pressable} from "react-native";
import HomeMap from "../../components/HomeMap/homemap";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CovidMessage from "../../components/CovidMessage/covidmsg";
import HomeSearch from "../../components/HomeSearch/homesearch";

const HomeScreen = props => {

  return (
    <View style={{ flex: 1 }}>
      <View style={[{ flex: 2 }]}>
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

export default HomeScreen;
