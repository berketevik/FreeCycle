/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import {Button, View,TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Component} from 'react/cjs/react.production.min';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var email = ''
var password = ''
export default class Login extends Component {
  render() {
    return (
      <ScrollView scrollEnabled={false}>
        <View style={{height:windowHeight,backgroundColor:'#F6F0E7',justifyContent:'center',alignItems:'center'}}>
        <TextInput
        placeholder='Email Adress'
        onChangeText={(mail)=>{email = mail}}

        />
        <TextInput
        placeholder='Password'
        secureTextEntry
        onChangeText={(pass)=>{password = pass}}
        />

        <Button title='Login' onPress={()=>{}}/>
        </View>
      </ScrollView>
    );
  }
}
