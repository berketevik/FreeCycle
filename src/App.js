/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React , { useState, useEffect }from 'react';
import type {Node} from 'react';
import Realm from "realm";
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './views/SplashScreen';
import Navigator from './Navigator';

import {Component} from 'react/cjs/react.production.min';
import Login from './views/Login';
import Signin from './views/Signin';
import Menu from './views/Menu';
import Category from './views/Category';
import ItemDescription from './views/ItemDescription';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App () {
 
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState(false);


  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //Burayi acinca user login aktif oluyo

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Navigator" component={Navigator} />
          <Stack.Screen name="Signin" component={SplashScreen} />
          <Stack.Screen name="Splash" component={Signin} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

    return (
      <NavigationContainer>
      {console.log(user)}
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Navigator">{props => <Navigator {...props} user={user}/>}</Tab.Screen>
          <Tab.Screen name="ItemDescription" component={ItemDescription} />
          <Tab.Screen name="Menu">{props => <Menu {...props} user={user}/>}</Tab.Screen>
          <Tab.Screen name="Category" component={Category} />
        </Tab.Navigator>
      </NavigationContainer>
    );
}
