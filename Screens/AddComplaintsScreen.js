import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Header, Icon , Avatar } from 'react-native-elements';
import firebase from 'firebase';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
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
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import db from '../config';
export default class AddComplaintsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      complaintTitle: '',
      complaintDescription: '',
      complaintImage: '#',
      name: '',
      contact: '',
      cameraPermissions: '',
    };
  }

takePhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPermissions: status === 'granted',
    });
    if (this.state.cameraPermissions) {
      await ImagePicker.launchCameraAsync({
        compressImageMaxWidth: 290,
        compressImageMaxHeight: 290,
        cropping: true,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState({ image: image.uri });
        this.setState({
          modalVisible: false,
        });
      });
    } else {
      return alert('Permissions Not Granted').then(() => {
        this.setState({
          modalVisible: false,
        });
      });
    }
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({
      modalVisible: false,
    });
    if (!cancelled) {
      this.setState({ image: uri });
      console.log('Worked' + this.state.image);
      this.setState({
        modalVisible: false,
      });
    }
  };

  fetchImage = (uniqueId) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('Images/' + this.state.userId + '/' + uniqueId);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection('Images').add({
          image: url,
        });
        console.log('Successful');
        alert('Successful');
        Alert.alert('Successful');
        this.setState({
          image: 'https://dummyimage.com/600x400/000/fff',
        });
      })
      .catch((error) => {
        console.log('error' + error);
        Alert.alert('Something went wrong in media uplaod, try again');
        this.setState({
          image: 'https://dummyimage.com/600x400/000/fff',
        });
      });
  };

   createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addComplaints = () => {
    db.collection('complaints').add({
      userId: this.state.emailId,
      complaintTitle: this.state.complaintTitle,
      complaintDescription: this.state.complaintDescription,
      complaintImage: this.state.complaintImage,
      complaintReply: 'Awaiting response',
      name: this.state.name,
      contact: this.state.contact,
    });
    alert('Complaint Added');
    Alert.alert('Complaint Added');
    this.props.navigation.navigate('YourComplaints');
  };

  getUserDetails() {
    db.collection('users')
      .where('email_id', '==', this.state.emailId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            name: data.name,
            contact: data.contact,
          });
        });
      });
  }
  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Add A Complaint',
              style: {
                fontWeight: 'bold',
                fontSize: 19,
                color: 'white',
              },
            }}
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="white"
                size={24}
                onPress={() => this.props.navigation.goBack()}
              />
            }
            backgroundColor={'green'}
          />
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.textinput}
              placeholder={'Title'}
              onChangeText={(text) => {
                this.setState({
                  complaintTitle: text,
                });
              }}
              value={this.state.complaintTitle}
            />
            <TextInput
              style={styles.textinput2}
              placeholder={'Please Let Us know the Complaint in detail...'}
              multiline="true"
              onChangeText={(text) => {
                this.setState({
                  complaintDescription: text,
                });
              }}
              value={this.state.complaintDescription}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                this.addComplaints();
              }}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
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
  updateButton: {
    width: '60%',
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
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  textinput2: {
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
    height: 100,
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
