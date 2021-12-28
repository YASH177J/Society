import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
export default class HelperScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View>
          <Header
            centerComponent={{
              text: 'Helper Screen',
              style: {
                fontWeight: 'bold',
                fontSize: 19,
                color: 'white',
              },
            }}
            backgroundColor={'green'}
          />
          <Text>Call A Worker</Text>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({});
