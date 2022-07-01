/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions,Text} from 'react-native';
import {Image, View} from 'react-native';
import {Component} from 'react/cjs/react.production.min';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Logo = require('../../assets/Logo.png');
export default class LoginSelect extends Component {

  componentDidMount(){
    setTimeout(() => {
      this.props.navigation.navigate('LoginSelect')

    }, 3500);
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: windowHeight,
          backgroundColor: '#F6F0E7',
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            height: windowHeight,
            width: windowHeight * 0.35,
          }}
          source={Logo}
        />


      </View>
    );
  }
}
