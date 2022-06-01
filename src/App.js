/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React , { useState, useEffect }from 'react';
import type {Node} from 'react';
import Realm from "realm";
import auth from '@react-native-firebase/auth';


import SplashScreen from './views/SplashScreen';
import Navigator from './Navigator';

import {Component} from 'react/cjs/react.production.min';
import Login from './views/Login';
import Signin from './views/Signin';

const Stack = createStackNavigator();

//Making schema for db
const ItemSchema = {
  name: "Item",
  properties: {
    _id: "int",
    name: "string",
    catagory: "string",
  },
  primaryKey: "_id",
};

(async ()=>{
  
  // const realm = await Realm.open({
  //   path: "myrealm",
  //   schema: [ItemSchema],
  // });


  // realm.write(() => {
  //   item1 = realm.create("Item", {
  //     _id: 1,
  //     name: "Ikea Table",
  //     catagory: "Table",
  //   });
  //   item2 = realm.create("Item", {
  //     _id: 2,
  //     name: "Ikea Closet",
  //     catagory: "Closet",
  //   });
  //   console.log(`created two items: ${item1.name} & ${item2.name}`);
  // });
  
// query realm for all instances of the "Task" type.



// Deleting Object

// const tasks = realm.objects("Item");

// tasks.map((task) => realm.write(() => {

//   // Delete the task from the realm.
//   realm.delete(task);
//   // Discard the reference.
// }))


// console.log(`The lists of tasks are: ${tasks.map((task) => task.name)}`);
// realm.close()


})();

//creating 2 variables




export default function App () {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();


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

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Navigator" component={Navigator} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Navigator" component={Navigator} />
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
