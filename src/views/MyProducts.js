/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, TouchableHighlight} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Logo = require('../../assets/Logo.png');
var loading = true;
export default class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {categoriesArray: [], imageHolder: '', urlArray: []};
  }

  componentDidMount() {
    this.mounted = true;
    this.category2 = firestore()
      .collection('Categories')
      .onSnapshot(querySnapshot => {
        var arr = [];
        querySnapshot.forEach(documentSnapshot => {
          const docId = documentSnapshot.id;
          firestore()
            .collection(docId)
            .where('OwnerID', '==', this.props.route.params.userId)
            .get()
            .then(querySnapshot2 => {
              querySnapshot2.forEach(documentSnapshot2 => {
                arr.push({
                  ...documentSnapshot2.data(),
                  key: documentSnapshot2.id,
                  selectedCategory: docId,
                });
                const func = async () => {
                  const ref = storage().ref(documentSnapshot2.data().img);
                  await ref.getDownloadURL().then(x => {
                    var joined = this.state.urlArray.concat([x]);
                    this.setState({urlArray: joined});
                  });
                };
                func();
              });
              this.setState({categoriesArray: arr});
            });
        });
      });
    loading = false;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  handleImage(item) {
    for (let i = 0; i < this.state.urlArray.length; i++) {
      if (this.state.urlArray[i].includes(item.substr(5))) {
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
      <SafeAreaView
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
          renderItem={({item}) => (
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.props.navigation.navigate('ItemDescription', {
                    selectedItem: item.key,
                    selectedCollection: item.selectedCategory,
                    userId: this.props.route.params.userId,
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
              <Text
                onPress={() => {
                  firestore()
                    .collection(item.selectedCategory)
                    .doc(item.key)
                    .delete()
                    .then(() => console.log('item deleted'));
                  this.props.navigation.navigate('Tab');
                }}
                style={{alignSelf: 'flex-end', color: 'red'}}>
                Delete
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
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
