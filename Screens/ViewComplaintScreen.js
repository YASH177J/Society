import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
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
import db from '../config';

import { ListItem } from 'react-native-elements';
export default class ViewComplaints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allComplaints: [],
      userId: firebase.auth().currentUser.email,
    };
  }
  getAllComplaints() {
    db.collection('complaints')
      .where('userId', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var allComplaints = [];
        snapshot.docs.map((doc) => {
          var complaint = doc.data();
          complaint['doc_id'] = doc.id;
          allComplaints.push(complaint);
        });
        this.setState({
          allComplaints: allComplaints,
        });
        console.log(this.state.allComplaints);
      });
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('ViewComplaintScreen', {
          complaintDetails: item,
        });
      }}
      style={styles.cardContainer}>
      <Image
        source={{
          uri: item.complaintImage,
        }}
        style={styles.img}
      />
      <View
        style={{
          flexDirection: 'column',
          paddingLeft: 10,
          width: '100%',
        }}>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.complaintTitle}
        </Text>
        <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.complaintDescription}
        </Text>
        <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.complaintReply}
        </Text>
        <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.name}
          <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.contact}
        </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  componentDidMount() {
    this.getAllComplaints();
  }
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          centerComponent={{
            text: 'Complaint Details',
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.allComplaints}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
    borderRadius: 10,
    alignContent: 'row',
    padding: 5,
    borderWidth: 2,
    borderColor: 'pink',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    width: '60%',
    fontSize: 16,
    padding: 5,
  },
  img: {
    width: '30%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
