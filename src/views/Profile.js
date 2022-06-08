/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import {View,Text} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


var loading = true;
export default class Profile extends Component {
  

  

  constructor(props){
    super(props);
    this.state = { user: []};
    this.category = firestore().collection('Users').onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
      if(this.props.user.uid === documentSnapshot.id){
        this.setState({user :{...documentSnapshot.data(),id: documentSnapshot.id}})
      }        
      });
    })
    loading = false
  }


  render() {
    if (loading) {
      return <View><Text>LOADING DATA...</Text></View>;
    }
    return (
      <View style={{justifyContent:'center',alignItems:'center',height:windowHeight,backgroundColor:'#F6F0E7'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}> 
          <Text> {this.state.user.Name}</Text>
          <Text> {this.state.user.email}</Text>
          <Text> {this.state.user.id}</Text>
          </View>

      </View>
    );
  }
}
