import React from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles.js';
import Entypo from 'react-native-vector-icons/Entypo';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';

const HomeSearch = props => {
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('DestinationSearch');
  };

  const somaiyaPressed = () => {
    ToastAndroid.showWithGravityAndOffset(
        "Coming soon",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
    );
  };
  const homePressed = () => {
    ToastAndroid.showWithGravityAndOffset(
        "Coming soon",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
    );
  };

  return (
    <View>
      {/* InputBar */}
      <Pressable onPress={goToSearch} style={styles.inputBox}>
        <Text style={styles.inputtext}>Where To?</Text>
        <View style={styles.timeContainer}>
          <AntDesign name={'clockcircle'} size={16} color={'#535353'} />
          <Text>Now</Text>
          <MaterialIcons name={'keyboard-arrow-down'} size={16} />
        </View>
      </Pressable>
      {/* Previous Destination */}
      <Pressable onPress={somaiyaPressed} style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name={'clockcircle'} size={20} color={'#fff'} />
        </View>
        <Text style={styles.destinationText}>Somaiya University</Text>
      </Pressable>
      {/* Home Destination */}
      <Pressable onPress={homePressed} style={styles.row}>
        <View style={[styles.iconContainer, {backgroundColor: '#218cff'}]}>
          <Entypo name={'home'} size={20} color={'#fff'} />
        </View>
        <Text style={styles.destinationText}>Home</Text>
      </Pressable>
    </View>
  );
};

export default HomeSearch;
