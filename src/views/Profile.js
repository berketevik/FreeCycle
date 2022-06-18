/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text, Image,StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var loading = true;
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {user: []};
    this.category = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (this.props.user.uid === documentSnapshot.id) {
            this.setState({
              user: {...documentSnapshot.data(), id: documentSnapshot.id},
            });
          }
        });
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
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F6F0E7',
        }}>
        <View
          style={{
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              alignContent: 'flex-end',
              width: windowWidth,
            }}>
            <Image
              source={require('../../assets/Logo.png')}
              style={{
                width: (windowHeight * 6) / 100,
                height: (windowHeight * 6) / 100,

                marginHorizontal: 3,
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              alignItems: 'center',
              justifyContent:"center",
            }}>
              <Text
              style={styles.styleTxt}
              >
              {this.state.user.Name}
              </Text>
              <Text
              style={styles.styleTxt}
              >
              {this.state.user.email}
              </Text>
              <Text
              style={styles.styleTxt}
              >
              {this.state.user.id}
              </Text>
              <Text
              style={styles.styleTxt}
              >
              MY PRODUCTS
              </Text>
          
          </View>
        </View>
        <View
          style={{
            flex: 9,
            justifyContent: "flex-end",
            alignItems: 'center',
           
          }}>
            <Text
            style={{ opacity:0.54,
              fontSize:windowHeight*0.013,paddingBottom:windowHeight*0.02}}
            >Please Verify Your Student ID</Text>
          </View>
          <TouchableHighlight
          style={{backgroundColor:"#D1C8BA",width:windowWidth*0.2,justifyContent:"center",height:windowHeight*0.04,borderRadius:10
      }}
          >
            <Text
            style={{fontSize:windowHeight*0.023,textAlign:"center"}}
            >

              Verify
            </Text>
          </TouchableHighlight>
      </SafeAreaView>
    
    );
  }
}

const styles = StyleSheet.create({
  styleTxt: {
    fontSize: windowHeight*0.017,
    fontWeight: 'bold',
    backgroundColor:"#D1C8BA",
    color:"#000000",
    width:windowWidth*0.8,
    height:windowHeight*0.04,
    textAlign:"center",
    paddingTop:windowHeight*0.01,
    marginTop:windowHeight*0.02

  
  },
});



