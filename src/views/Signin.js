/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions} from 'react-native';
import {Button, View, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Component} from 'react/cjs/react.production.min';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var name = null;
var email = null;
var password = null;
var password2 = null;
export default class Signin extends Component {
  render() {
    return (
      <ScrollView scrollEnabled={false}>
        <View
          style={{
            height: windowHeight,
            backgroundColor: '#F6F0E7',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Name"
            onChangeText={n => {
              name = n;
            }}
          />
          <TextInput
            placeholder="Email Adress"
            onChangeText={mail => {
              email = mail;
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={pass => {
              password = pass;
            }}
          />
          <TextInput
            placeholder="Password again"
            secureTextEntry
            onChangeText={pass => {
              password2 = pass;
            }}
          />

          <Button
            title="Sign In"
            onPress={() => {
              if (password === password2 && email != null) {
                auth()
                  .createUserWithEmailAndPassword(
                    email,
                    password,
                  )
                  .then((credential) => {
                    if(credential && credential.user){
                      firestore().collection('Users').doc(credential.user.uid).set({
                        Name:name,
                        email:email
                      })
                    }


                  })
                  .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                      console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                      console.log('That email address is invalid!');
                    }

                    console.error(error);
                  });
              }
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
