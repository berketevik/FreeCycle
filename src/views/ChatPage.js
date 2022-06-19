/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator, Button, Dimensions} from 'react-native';
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

  componentDidMount(){

    this.category = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const arr = [];

        querySnapshot.forEach(documentSnapshot => {
          var x = chatID(documentSnapshot.id, this.props.user.uid);

          firestore()
            .collection('messages')
            .doc(x)
            .collection('chats').get().then(function(querySnapshot){
              if(!querySnapshot.empty){

                arr.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                      });

              }
            })
            
        });
        this.setState({usersArray: arr});
      });
  }
  componentDidUpdate(snapshot){
    loading = false
  }

  render() {
    if (loading) {
      return (<View style={{justifyContent:'center',alignItems:'center',height:windowHeight}}>
        <Button title='Open Chats' onPress={()=>{
          loading = false
          this.forceUpdate()
        }}/>
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
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data={this.state.usersArray}
          renderItem={({item}) => (
            <View>
              <Button
                title={item.Name}
                onPress={() => {
                  const chatId = chatID(item.id, this.props.user.uid);
                  this.props.navigation.navigate('Chat', {
                    uid: this.props.user.uid,
                    email: this.props.user.email,
                    chatId: chatId,
                  });
                }}
              />
            </View>
          )}
        />
      </View>
    );
  }
}
