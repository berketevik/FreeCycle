/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, TouchableHighlight} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Logo = require('../../assets/Logo.png');
var loading = true;
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {categoriesArray: [], imageHolder: '', urlArray: []};
  }
  componentDidMount() {
    this.category = firestore()
      .collection(this.props.route.params.selectedCategory)
      .onSnapshot(querySnapshot => {
        const arr = [];
        try {
          querySnapshot.forEach(documentSnapshot => {
            arr.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
            const func = async () => {
              const ref = storage().ref(documentSnapshot.data().img);
              await ref.getDownloadURL().then(x => {
                var joined = this.state.urlArray.concat([x]);
                this.setState({urlArray: joined});
              });
            };
            func();
          });
          this.setState({categoriesArray: arr});
        } catch (error) {
          console.log(error);
        }
      });
    loading = false;
  }

  handleImage(item) {
    for (let i = 0; i < this.state.urlArray.length; i++) {
      if (this.state.urlArray[i].includes(item.substr(5))) {
        console.log(this.state.urlArray[i]);
        return this.state.urlArray[i];
      }
    }
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
            justifyContent: 'flex-start',
            alignSelf: 'baseline',
          }}
        />
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          numColumns={2}
          data={this.state.categoriesArray}
          style={{paddingTop: windowHeight * 0.04, height: windowHeight}}
          renderItem={({item, index}) => (
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('ItemDescription', {
                  selectedItem: item.key,
                  selectedCollection: this.props.route.params.selectedCategory,
                  userId: this.props.route.params.userId,
                  userEmail: this.props.route.params.userEmail,
                });
              }}>
              <View
                style={{
                  paddingTop: windowHeight * 0.02,
                  paddingLeft: windowWidth * 0.03,
                }}>
                {item.img === undefined ? (
                  <Image source={Logo} />
                ) : (
                  <Image
                    style={{width: 150, height: 75}}
                    source={{
                      uri: this.handleImage(item.img),
                    }}
                  />
                )}
                <Text
                  style={{
                    color: '#ffffff',
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    backgroundColor: '#314951',
                    width: 150,
                    textAlign: 'center',
                    height: windowHeight * 0.03,
                    paddingTop: windowHeight * 0.005,
                  }}>
                  {item.Name}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
