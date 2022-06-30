/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import {Button, View, TextInput, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Component} from 'react/cjs/react.production.min';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var email = null;
var password = null;
export default class Signin extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex:1}}>
        <ScrollView
          contentContainerStyle={{height: '100%'}}
          style={{flexGrow: 1, backgroundColor: '#F6F0E7'}}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/Logo.png')}
              style={{
                width: 150,
                height: 150,

                marginHorizontal: 3,
              }}
            />
          </View>
          <View
            style={{
              flex: 5,
              width: '100%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#F6F0E7',
                borderColor: '#314951',
                borderWidth: 6,
                borderRadius: 100,
                width: '80%',
                height: '50%',
                alignSelf: 'center',
                paddingHorizontal: '2.8%',
                paddingVertical: '1%',
              }}>
              <View
                style={{
                  flex: 1,
                  borderRadius: 100,
                  overflow: 'hidden',
                  backgroundColor: '#F6F0E7',
                  borderColor: '#F6F0E7',
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#314951',
                    borderTopLeftRadius: 100,
                    borderBottomLeftRadius: 40,
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 40,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    paddingBottom: '8%',
                  }}>
                  <Text
                    style={{
                      color: '#F6F0E7',
                      paddingLeft: windowWidth * 0.23,
                      paddingTop: windowHeight * 0.02,
                      justifyContent: 'center',
                      fontSize: windowHeight * 0.03,
                    }}>
                    SIGN IN
                  </Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flex: 10, backgroundColor: '#F6F0E7'}}>
                    <View
                      style={{
                        flex: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{
                          fontSize: (windowHeight * 2.5) / 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        placeholder="Email Adress"
                        onChangeText={mail => {
                          email = mail;
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 3,
                        backgroundColor: '#314951',
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                      }}></View>

                    <View
                      style={{
                        flex: 3,
                        backgroundColor: '#F6F0E7',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{
                          fontSize: (windowHeight * 2.5) / 100,
                        }}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={pass => {
                          password = pass;
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 3,
                    backgroundColor: '#314951',
                  }}>
                  <View
                    style={{
                      flex: 2,
                      backgroundColor: '#314951',
                      marginTop: '10%',
                    }}></View>
                  <View style={{flex: 9, backgroundColor: '#314951'}}>
                    <Button
                      title="Login"
                      onPress={() => {
                        if (password != null && email != null) {
                          auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(() => {
                              console.log('User account signed in!');
                            })
                            .catch(error => {
                              if (error.code === 'auth/email-already-in-use') {
                                console.log(
                                  'That email address is already in use!',
                                );
                              }

                              if (error.code === 'auth/invalid-email') {
                                console.log('That email address is invalid!');
                              }

                              console.error(error);
                            });
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
