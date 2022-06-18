/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text,Image} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Logo = require('../../assets/Logo.png');
var loading = true;
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {categoriesArray: []};
    this.category = firestore()
      .collection('Categories')
      .onSnapshot(querySnapshot => {
        const arr = [];

        querySnapshot.forEach(documentSnapshot => {
          arr.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        this.setState({categoriesArray: arr});
      });
    loading = false;
  }

  render() {
    if (loading) {
      return (
        <View>
          <Text>LOADING DATA...</Text>
        </View>
      );
    }
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'red',
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
          height: windowHeight,
          backgroundColor: '#F6F0E7',
        }}>
          <Image
              source={require('../../assets/Logo.png')}
              style={{
                width: (windowHeight * 6) / 100,
                height: (windowHeight * 6) / 100,
                marginHorizontal: 3,
                justifyContent:"flex-start",
                alignSelf:"baseline"
              }}
            />
            <Image
              source={require('../../assets/Line1.png')}
              resizeMode="contain"
              style={{
                width: windowWidth,
                height: (windowHeight * 6) / 100,
                marginHorizontal: 3,
                justifyContent:"flex-start",
                alignSelf:"baseline",
                
              }}
            />
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data={this.state.categoriesArray}
          renderItem={({item}) => (
            <View
       
            >
            <Image
            blurRadius={3}
              source={require('../../assets/Furniture.jpeg')}
              style={{
                width:windowWidth*0.8,
                height:windowHeight*0.1,
                borderRadius: 20,
                paddingVertical: 5,
                marginVertical: 5,
                
                
              }}
            />
            <Text
              onPress={() => {
                this.props.navigation.navigate('Category', {
                  selectedCategory: item.key,
                });
              }}
              style={{
                borderWidth: 1,
                borderRadius: 20,
                paddingVertical: 5,
                marginVertical: 5,
                width:windowWidth*0.8,
                height:windowHeight*0.1,
                position:"absolute",
                textAlign:"center",
                paddingTop:windowHeight*0.03,
                fontSize:windowHeight*0.04,
                color:"white"
              }}>
              {item.key}
            </Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
