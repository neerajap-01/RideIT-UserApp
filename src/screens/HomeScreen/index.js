import React, {useEffect} from "react";
import {StyleSheet, View, Pressable, ToastAndroid} from "react-native";
import HomeMap from "../../components/HomeMap/homemap";
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
