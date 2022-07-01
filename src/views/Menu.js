/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {View, Text,Image} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';


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
        try {
          querySnapshot.forEach(documentSnapshot => {
            arr.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          this.setState({categoriesArray: arr});
        } catch (error) {
          console.log(error)
        }
        
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
      <View
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
                marginTop:windowHeight*0.02,
                width: (windowHeight * 12) / 100,
                height: (windowHeight * 12) / 100,
                marginHorizontal: 3,
                justifyContent:"flex-start",
              }}
            />
            <Text style={{borderWidth:7,width:windowWidth,borderBottomWidth:0,borderRightWidth:0,borderLeftWidth:0,marginTop:windowHeight*0.02,borderColor:'#314951'}}/>
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
                  userId:this.props.user.uid,
                  userEmail:this.props.user.email,
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
      </View>
    );
  }
}
