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
const selectedItem = 'iJ7GhOBbH9ZLXcZBsUiv'


const Logo = require('../../assets/Logo.png');
var loading = true;
export default class ItemDescription extends Component {
  

  

  constructor(props){
    super(props);
    this.state = { categoriesArray: [] };
    this.category = firestore().collection(selectedCollection).doc(selectedItem).onSnapshot(documentSnapshot => {
     
        this.setState({categoriesArray : {...documentSnapshot.data(),key: documentSnapshot.id}})
        console.log(this.state.categoriesArray)
    })
    loading = false
  }


  render() {
    var item = this.state.categoriesArray

    if (loading) {
      return <View><Text>LOADING DATA...</Text></View>;
    }
    return (
      <View style={{justifyContent:'center',alignItems:'center',height:windowHeight,backgroundColor:'#F6F0E7'}}>
          <Text>
              {item.Name}
          </Text>

      </View>
    );
  }
}
