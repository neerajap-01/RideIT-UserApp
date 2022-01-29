// @flow
import React, {useCallback} from 'react';
import {Alert, Button, Linking, Text, View} from 'react-native';
import styles from './styles';

const supportedURL = 'https://www.mohfw.gov.in/';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      //Alert.alert(`Don't know how to open this URL: ${url}`);
      await Linking.openURL(url);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

// OpenWEB = () => {
//     Linking.openURL('https://covid19.who.int');
// };

const Covidmsg = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel only if necessary</Text>
      <Text style={styles.text}>
        Battle With Covid-19 is Still On! Only together we can flatten the
        curve. We advise you to check your status on the Aarogya Setu app every
        day to help control the spread of infection.
      </Text>
      <View style={styles.learnMore}>
        <OpenURLButton url={supportedURL}>Learn more...</OpenURLButton>
      </View>
    </View>
  );
};

export default Covidmsg;
