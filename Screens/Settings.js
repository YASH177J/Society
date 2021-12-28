import * as React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import { Header, Icon, Avatar } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import db from "../config"
export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      address: '',
      docID: '',
    };
  }

  updateDetails = async () => {
    try {
      db.collection('users').doc(this.state.docID).update({
        name: this.state.name,
        contact: this.state.contact,
        address: this.state.address,
      });
      Alert.alert('Profile Updated');
      alert('Profile updated');
    } catch (e) {
      console.log(e);
    }
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserDetails = () => {
    var email = this.state.email;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            email: data.email,
            name: data.name,
            contact: data.contact,
            address: data.address,
            docID: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Profile',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 19,
                color: '#fff',
              },
            }}
            backgroundColor={'green'}
            rightComponent={
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color="#fff"
                style={{ marginTop: 5 }}
                onPress={() => {
                  this.logout();
                }}
              />
            }
          />
          <ScrollView
            style={{
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
            }}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.textinput}
                placeholder={'Society Name'}
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                }}
                value={this.state.name}
              />
              <TextInput
                style={styles.textinput}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
                value={this.state.contact}
              />
              <TextInput
                style={styles.textinput}
                multiline={true}
                numberOfLines={2}
                placeholder={'Address'}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
                value={this.state.address}
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  this.updateDetails();
                }}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  imageContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  updateButton: {
    width: '80%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'green',
    borderRadius: 20,
  },
  textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
    height: 50,
    borderColor: 'black',
    borderRadius: 20,
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
