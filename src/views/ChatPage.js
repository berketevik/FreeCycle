/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import {View,Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const selectedCollection = 'Table'


const Logo = require('../../assets/Logo.png');
var loading = true;
export default class ChatPage extends Component {
  

  

  constructor(props){
    super(props);
    this.state = { categoriesArray: [] };
    this.category = firestore().collection(selectedCollection).onSnapshot(querySnapshot => {
      const arr = [];

      querySnapshot.forEach(documentSnapshot => {
        arr.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      console.log(arr)
      this.setState({categoriesArray : arr})
    })
    loading = false
  }


  render() {
    if (loading) {
      return <View><Text>LOADING DATA...</Text></View>;
    }
    return (
      <View style={{justifyContent:'center',alignItems:'center',height:windowHeight,backgroundColor:'#F6F0E7'}}>
          <FlatList data={this.state.categoriesArray}
          renderItem = {({item})=>(
            <Text>
              {item.Name}
            </Text>
          )}
          />
      </View>
    );
  }
}
