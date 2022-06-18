/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Dimensions} from 'react-native';
import {View, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const selectedCollection = 'Table';

const Logo = require('../../assets/Logo.png');
var loading = true;
var targetId = 'RxUgkAnTtgfjVWXu1sakIRwop9b2';

export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {categoriesArray: []};
    this.category = firestore()
      .collection(selectedCollection)
      .onSnapshot(querySnapshot => {
        const arr = [];

        querySnapshot.forEach(documentSnapshot => {
          arr.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log(arr);
        this.setState({categoriesArray: arr});
      });
    loading = false;
  }

  chatID = (targetID) => {
    const chatterID = this.props.user.uid;
    const chateeID = targetID;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join('_');
  };

  render() {
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
        <Button
          title="Press HERE"
          onPress={() => {
            const chatId  = this.chatID(targetId)
            this.props.navigation.navigate('Chat',{'uid':this.props.user.uid,'email':this.props.user.email,'chatId':chatId});
          }}
        />
      </View>
    );
  }
}
