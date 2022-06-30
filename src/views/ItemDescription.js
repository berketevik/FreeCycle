/* eslint-disable prettier/prettier */
import React, {isValidElement} from 'react';
import {Button, Dimensions, Image} from 'react-native';
import {View, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const url = await storage().ref('images/profile-1.png').getDownloadURL();
// console.log('ustteki url -----   ' + url)

const Logo = require('../../assets/Logo.png');
var loading = true;

function chatID(targetID, userId) {
  const chatterID = userId;
  const chateeID = targetID;
  const chatIDpre = [];
  chatIDpre.push(chatterID);
  chatIDpre.push(chateeID);
  chatIDpre.sort();
  return chatIDpre.join('_');
}

export default class ItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArray: [],
      userId: '',
      showButton: false,
    };
    this.setState({userId: this.props.route.params.userId});
  }
  componentDidMount() {
    this.category = firestore()
      .collection(this.props.route.params.selectedCollection)
      .doc(this.props.route.params.selectedItem)
      .onSnapshot(documentSnapshot => {
        this.setState({
          categoriesArray: {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          },
        });

        firestore()
          .collection('Users')
          .doc(this.props.route.params.userId)
          .get()
          .then(documentSnapshot2 => {
            if (
              documentSnapshot2.data().isStudent !== undefined &&
              this.props.route.params.userId !== documentSnapshot.data().OwnerID
            ) {
              this.setState({showButton: true});
            } else if (
              this.props.route.params.userId === documentSnapshot.data().OwnerID
            ) {
              this.setState({isMyItem: true});
            }
          });

        const func = async () => {
          const ref = storage().ref(this.state.categoriesArray.img);
          await ref.getDownloadURL().then(x => {
            this.setState({url: x});
          });
        };

        func();
      });
    loading = false;
  }
  buttonHandler() {
    if (this.state.isMyItem) {
      return <Text style={{color:'brown'}}>This item belong to yours.</Text>;
    } else {
      return (
        <Text style={{color:'brown',textAlign:'center'}}>
          To demand that item, first you need to go to your profile page and
          verify that you are a student.
        </Text>
      );
    }
  }

  render() {
    var item = this.state.categoriesArray;

    if (loading) {
      return (
        <View>
          <Text>LOADING DATA...</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: windowHeight,
          backgroundColor: '#F6F0E7',
        }}>
        {this.state.url === '' ? (
          <Image source={Logo} />
        ) : (
          <Image
            style={{width: '70%', height: '70%'}}
            source={{
              uri: this.state.url,
            }}
          />
        )}
        <Text>{item.Name}</Text>
        <Text>{item.Information}</Text>
        {this.props.route.params.userId !== undefined &&
        this.state.showButton ? (
          <Button
            title="Urun Sahibiyle Iletisim Kur"
            onPress={() => {
              const chatId = chatID(
                item.OwnerID,
                this.props.route.params.userId,
              );
              this.props.navigation.navigate('Chat', {
                uid: this.props.route.params.userId,
                email: this.props.route.params.userEmail,
                chatId: chatId,
              });
            }}
          />
        ) : this.buttonHandler()
        }
      </View>
    );
  }
}
