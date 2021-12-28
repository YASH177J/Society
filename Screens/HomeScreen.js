import React , {Component}from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ListItem, Avatar, Header, Icon } from 'react-native-elements';
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
import db from "../config"
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     allAnnouncements: [],
     userId: firebase.auth().currentUser.email,
    };
  }

  getAllAnnouncements() {
    db.collection('announcements').onSnapshot((snapshot) => {
        var allAnnouncements = [];
        snapshot.docs.map((doc) => {
          var announcement = doc.data();
          announcement['doc_id'] = doc.id;
          allAnnouncements.push(announcement);
        });
        this.setState({
          allAnnouncements: allAnnouncements,
        });
        console.log(this.state.allAnnouncements);
      });
  }

  componentDidMount() {
    this.getAllAnnouncements();
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('HomeScreen', {
          announcementDetails: item,
        });
      }}
      style={styles.cardContainer}>
      <Image
        source={{
          uri: item.announcementImage,
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
          {item.announcementTitle}
        </Text>
        <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.announcementDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
         <View style={{flex:0.3, backgroundColor:"green", justifyContent:"center", alignItems:"center"}}>
         <Text>Welcome</Text>
         </View>

          <View style={{ flex: 0.7 }}>
            <FlatList
              data={this.state.allAnnouncements}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  
});
