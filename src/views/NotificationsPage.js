/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var temp = 0;
var tempArray = [];
const Logo = require('../../assets/Logo.png');
var loading = true;
export default class NotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {categoriesArray: [], unreadMessage: 0};
    firestore()
      .collection('Users')
      .doc(this.props.user.uid)
      .collection('notifications').orderBy('createdAt','desc')
      .get()
      .then(querrySnapshot => {
        querrySnapshot.forEach(documentSnapshot => {
          tempArray.push({...documentSnapshot.data(), id: documentSnapshot.id});
          if (!documentSnapshot.data().seen) {
            temp += 1;
            firestore()
              .collection('Users')
              .doc(this.props.user.uid)
              .collection('notifications')
              .doc(documentSnapshot.id)
              .update({seen: true})
              .then(console.log('updated'));
          }
        });
        this.setState({unreadMessage: temp});
        this.setState({categoriesArray: tempArray});
      });
    loading = false;
  }

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
        <FlatList
          data={this.state.categoriesArray}
          renderItem={({item,index}) => (
            <View>
              <Text style={index+1 > this.state.unreadMessage ? styles.styleTxt : styles.styleTxtUnread}>{item.notification}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  styleTxt: {
    fontSize: windowHeight * 0.017,
    fontWeight: 'bold',
    backgroundColor: '#D1C8BA',
    color: '#000000',
    width: windowWidth * 0.8,
    height: windowHeight * 0.04,
    textAlign: 'center',
    paddingTop: windowHeight * 0.01,
    marginTop: windowHeight * 0.02,
    borderRadius: 10,
  },
  styleTxtUnread: {
    fontSize: windowHeight * 0.017,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#ded883',
    color: '#000000',
    width: windowWidth * 0.8,
    height: windowHeight * 0.04,
    textAlign: 'center',
    paddingTop: windowHeight * 0.01,
    marginTop: windowHeight * 0.02,
  },
});
