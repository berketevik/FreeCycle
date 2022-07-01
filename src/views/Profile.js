/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

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
        try {
          
        querySnapshot.forEach(documentSnapshot => {
          if (this.props.user.uid === documentSnapshot.id) {
            this.setState({
              user: {...documentSnapshot.data(), id: documentSnapshot.id},
            });
          }
        });
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
              justifyContent: 'center',
            }}>
            <Text style={styles.styleTxt}>{this.state.user.Name}</Text>
            <Text style={styles.styleTxt}>{this.state.user.email}</Text>
            <Text style={styles.styleTxt}>{this.state.user.id}</Text>
            <Text
              onPress={() => {
                this.props.navigation.navigate('MyProducts', {
                  userId: this.props.user.uid,
                });
              }}
              style={styles.styleTxt}>
              MY PRODUCTS
            </Text>
            <Text
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => console.log('User signed out!'))
                  .catch(error => {
                    console.log(error, 'error');
                  });
              }}>
              Sign Out
            </Text>
          </View>
        </View>

        {this.state.user.isStudent === undefined ? (
          <View
            style={{
              flex: 9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 9,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  opacity: 0.54,
                  fontSize: windowHeight * 0.013,
                  paddingBottom: windowHeight * 0.02,
                }}>
                Please Verify Your Student ID
              </Text>
            </View>
            <View>
              <TouchableHighlight
                style={{
                  backgroundColor: '#D1C8BA',
                  width: windowWidth * 0.2,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  onPress={() => {
                    this.props.navigation.navigate('Verify', {
                      userId: this.props.user.uid,
                    });
                  }}
                  style={{
                    fontSize: windowHeight * 0.017,
                    fontWeight: 'bold',
                    backgroundColor: '#D1C8BA',
                    color: '#000000',
                    height: windowHeight * 0.04,
                    textAlign: 'center',
                    paddingTop: windowHeight * 0.01,
                    marginTop: windowHeight * 0.02,
                    marginBottom: windowHeight * 0.03,
                  }}>
                  Verify
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <View style={{flex: 9}} />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  styleTxt: {
    fontSize: windowHeight * 0.017,
    fontWeight: 'bold',
    backgroundColor: '#D1C8BA',
    color: '#000000',
    width: windowWidth * 0.8,
    height: windowHeight * 0.04,
    textAlign: 'center',
    paddingTop: windowHeight * 0.01,
    marginTop: windowHeight * 0.02,
  },
});
