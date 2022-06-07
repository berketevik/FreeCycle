/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions} from 'react-native';
import {Button, View, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Component} from 'react/cjs/react.production.min';
import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var email = null
var password = null
export default class Login extends Component {
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

          <Button
            title="Login"
            onPress={() => {
              if (password != null && email != null) {
                auth()
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {
                    console.log('User account signed in!');
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
