/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, Text} from 'react-native';
import {Image, View} from 'react-native';
import {Component} from 'react/cjs/react.production.min';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Logo = require('../../assets/Logo.png');
export default class SplashScreen extends Component {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F6F0E7',
          height: '100%',
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            width: windowHeight * 0.35,
          }}
          source={Logo}
        />
        <View style={{height: 40}} />
        <Text
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}
          style={{
            fontSize: 25,
            paddingHorizontal: 100,
            paddingVertical: 20,
            borderRadius: 20,
            backgroundColor: '#314951',
            color: 'white',
          }}>
          Login
        </Text>
        <View style={{height: 40}} />
        <Text
          onPress={() => {
            this.props.navigation.navigate('Signin');
          }}
          style={{
            fontSize: 25,
            paddingHorizontal: 100,
            paddingVertical: 20,
            borderRadius: 20,
            backgroundColor: '#314951',
            color: 'white',
          }}>
          Signin
        </Text>
      </View>
    );
  }
}
