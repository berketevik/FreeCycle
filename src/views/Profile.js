/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import {View,Text,Image} from 'react-native';
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
      <View
       style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"#F6F0E7"}}>
         
         <View
       style={{ flex: 3, justifyContent: "center", alignItems: "center",backgroundColor:"pink"}}>
          <View
      style={{ flex: 1, justifyContent:  "center", alignItems: "flex-start",alignContent:"flex-end",width:windowWidth}}>
         <Image
          source={require('../../assets/Logo.png')}
          style={{ width: windowHeight*8/100,
            height: windowHeight*8/100,

            marginHorizontal: 3}}
        />
            
     </View>
     <View
      style={{ flex: 4, justifyContent: "center", alignItems: "center",backgroundColor:"yellow"}}>
         <Image
          source={require('../../assets/Logo.png')}
          style={{ width: 150,
            height: 150,

            marginHorizontal: 3}}
        />
     </View>

      </View>
      <View
      style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
        
     </View>
      </View>
      
     
      
    );
  }
}
