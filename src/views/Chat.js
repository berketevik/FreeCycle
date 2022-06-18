/* eslint-disable prettier/prettier */
import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
// import {Avatar} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var loading = true;

export const sendChatMessage = (chatID, chat) => {
  return firestore()
    .collection('messages')
    .doc(chatID)
    .collection('chats')
    .add(chat);
};

const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState();
  const {uid, email, chatId} = route.params;
    console.log(uid)
  useEffect(() => {
    firestore()
      .collection('messages')
      .doc(chatId)
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(function (doc) {
        var tempArr = []
        for (const message in doc.docs) {
            if (Object.hasOwnProperty.call(doc.docs, message)) {
                const element = doc.docs[message];
                tempArr.push(element)
            }
        }
        console.log(tempArr)
      });

    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       // avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);

  }, []);
  const onSend = useCallback((msg = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
    const {_id, createdAt, text, user} = msg[0];
    sendChatMessage(chatId, {_id, createdAt, text, user});
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={msg => onSend(msg)}
      user={{
        _id: uid,
        name: email,
        // avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default Chat;