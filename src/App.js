/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from './views/SplashScreen';
import Navigator from './Navigator'

import Login from './views/Login';
import Signin from './views/Signin';
import Menu from './views/Menu';
import Category from './views/Category';
import ItemDescription from './views/ItemDescription';
import NotificationsPage from './views/NotificationsPage';
import Donate from './views/Donate';
import ChatPage from './views/ChatPage';
import Profile from './views/Profile';
import Chat from './views/Chat';
import MyProducts from './views/MyProducts';
import LoginSelect from './views/LoginSelect';
import Verify from './views/Verify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, LogBox} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const storeData = async value => {
  try {
    await AsyncStorage.setItem('@numberOfNotifications', value).then(
      console.log('async storage data store succesful with value of ' + value),
    );
  } catch (e) {
    // saving error
  }
};

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState(false);
  const [notification, setNotification] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    fire(); //Get the unseen messages count and put it into local storage
    return subscriber; // unsubscribe on unmount
  }, [notification]);

  //Get the unseen messages count and put it into local storage
  var temp = 0;
  const fire = () =>{
    try {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('notifications')
        .get()
        .then(querrySnapshotAppPage => {
          try {
            querrySnapshotAppPage.forEach(documentSnapshot => {
              if (!documentSnapshot.data().seen) {
                temp += 1;
              }
            });
            setNotification(temp);
            storeData(temp.toString());
          } catch (error) {
            console.log(error);
          }
        });
      
    } catch (error) {
      console.log(error)
    }
  }
  
    

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="Navigator" component={Navigator} /> */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="LoginSelect" component={LoginSelect} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  function Tabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: '#F6F0E7',
          tabBarInactiveBackgroundColor: '#F6F0E7',
        }}>
        {LogBox.ignoreAllLogs()}
        <Tab.Screen
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('../assets/menu.png')}
                style={{
                  justifyContent: 'flex-start',
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
          name="Menu"
          tabBar>
          {props => <Menu {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('../assets/notification.png')}
                style={{
                  justifyContent: 'flex-start',
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
          name={'Notifications'}
          tabBar>
          {props => <NotificationsPage {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabel: 'Donate',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('../assets/photo-camera-interface-symbol-for-button.png')}
                style={{
                  justifyContent: 'flex-start',
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
          name="Donate">
          {props => <Donate {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('../assets/chat.png')}
                style={{
                  justifyContent: 'flex-start',
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
          name="ChatPage">
          {props => <ChatPage {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('../assets/profile.png')}
                style={{
                  justifyContent: 'flex-start',
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
          name="Profile">
          {props => <Profile {...props} user={user} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={Tabs} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ItemDescription" component={ItemDescription} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Notifications" component={NotificationsPage} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="MyProducts" component={MyProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
