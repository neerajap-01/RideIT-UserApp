/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import 'react-native-gesture-handler';
import Navigation from './src/navigation'

navigator.geolocation = require('@react-native-community/geolocation');
Amplify.configure(config)

const App: () => React$Node = () => {

  return (
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});


export default App;
