/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import type {Node} from 'react';


import SplashScreen from './views/SplashScreen'
import { Component } from 'react/cjs/react.production.min';


const Stack = createStackNavigator();
export default class App extends Component{
  
  render(){
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Splash Screen" component={SplashScreen} />
    </Stack.Navigator>

    
    </NavigationContainer>
  );}
};

