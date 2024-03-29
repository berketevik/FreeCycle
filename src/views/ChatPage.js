/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator, Button, Dimensions, StyleSheet} from 'react-native';
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

function chatID(targetID, userId) {
  const chatterID = userId;
  const chateeID = targetID;
  const chatIDpre = [];
  chatIDpre.push(chatterID);
  chatIDpre.push(chateeID);
  chatIDpre.sort();
  return chatIDpre.join('_');
}

export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {usersArray: []};
  }

  componentDidMount() {
    this.category = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const arr = [];
        querySnapshot.forEach(documentSnapshot => {
          var x = chatID(documentSnapshot.id, this.props.user.uid);

          firestore()
            .collection('messages')
            .doc(x)
            .collection('chats')
            .get()
            .then(function (querySnapshot) {
              if (!querySnapshot.empty) {
                console.log('pushed');
                arr.push({
                  ...documentSnapshot.data(),
                  id: documentSnapshot.id,
                });
              }
            });
          this.setState({usersArray: arr});
        });
      });
    setTimeout(() => {
      loading = false;
      this.forceUpdate();
    }, 1500);
  }

  render() {
    if (loading) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: windowHeight,
          }}>
          <ActivityIndicator size={'large'} />
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
          paddingTop: windowHeight * 0.02,
        }}>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data={this.state.usersArray}
          renderItem={({item}) => (
            <View>
              <Text
                onPress={() => {
                  const chatId = chatID(item.id, this.props.user.uid);

                  firestore()
                    .collection('messages')
                    .doc(chatId)
                    .collection('chats')
                    .get()
                    .then(querrySnapshot => {
                      querrySnapshot.forEach(documentSnapshot => {
                        const docId = documentSnapshot.id;
                        firestore()
                          .collection('messages')
                          .doc(chatId)
                          .collection('chats')
                          .doc(docId)
                          .delete();
                      });
                    });

                  firestore()
                    .collection('messages')
                    .doc(chatId)
                    .delete()
                    .then(() => {
                      console.log('item deleted');
                    });
                }}
                style={{textAlign: 'right', fontWeight: '800', color: 'red'}}>
                X
              </Text>
              <Text
                style={{
                  width: windowWidth * 0.6,
                  height: windowHeight * 0.1,
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderWidth: 2,
                  justifyContent: 'center',
                  marginVertical: 10,
                  borderRadius: 20,
                  paddingTop: 5,
                }}
                onPress={() => {
                  const chatId = chatID(item.id, this.props.user.uid);
                  this.props.navigation.navigate('Chat', {
                    uid: this.props.user.uid,
                    email: this.props.user.email,
                    chatId: chatId,
                    targetId: item.id,
                  });
                }}>
                {item.Name}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}
