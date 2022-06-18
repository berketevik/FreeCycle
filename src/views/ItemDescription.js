/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Dimensions} from 'react-native';
import {View, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    this.state = {categoriesArray: [], userId: 'dene'};
    this.setState({'userId': this.props.route.params.userId});
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
      });
    loading = false;
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
        <Text>{item.Name}</Text>
        <Text>{item.Information}</Text>
        <Button
          title="Urun Sahibiyle Iletisim Kur"
          onPress={() => {
            const chatId = chatID(item.OwnerID, this.props.route.params.userId);
            this.props.navigation.navigate('Chat', {
              uid: this.props.route.params.userId,
              email: this.props.route.params.userEmail,
              chatId: chatId,
            });
          }}
        />
      </View>
    );
  }
}
