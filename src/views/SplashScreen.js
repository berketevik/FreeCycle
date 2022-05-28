/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, View} from 'react-native';
import {Component} from 'react/cjs/react.production.min';

const Logo = require('../../assets/Logo.png');
export default class SplashScreen extends Component {
  render() {
    return (
      <View>
        <Image source={Logo} />
      </View>
    );
  }
}
