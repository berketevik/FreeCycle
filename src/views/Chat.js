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

var loading = false;

export const sendChatMessage = (chatID, chat) => {
  return firestore()
    .collection('messages')
    .doc(chatID)
    .collection('chats')
    .add(chat);
};

const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState();
  const {uid, email, chatId, targetId} = route.params;
  useEffect(() => {
    firestore()
      .collection('messages')
      .doc(chatId)
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(function (doc) {
        var tempArr = [];
        try {
          for (const message in doc.docs) {
            if (Object.hasOwnProperty.call(doc.docs, message)) {
              const element = doc.docs[message];
              tempArr.push({
                ...element.data(),
                createdAt: element.data().createdAt.toDate(),
              });
            }
          }
          setMessages(tempArr);
          loading = false;
          
        } catch (error) {
         console.log(error) 
        }
        
      });
  }, []);
  const onSend = useCallback((msg = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
    const {_id, createdAt, text, user} = msg[0];
    sendChatMessage(chatId, {_id, createdAt, text, user});
    firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        const name = documentSnapshot.data().Name;

        firestore()
          .collection('Users')
          .doc(targetId)
          .collection('notifications')
          .add({
            notification:
              "Kullanıcı '" + name + "' size yeni bir mesaj gönderdi. ",
            createdAt: firestore.Timestamp.now(),
            seen: false,
          });
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  } else {
    return (
      <>
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
      </>
    );
  }
};

export default Chat;
