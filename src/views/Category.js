/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import {View,Text,Image,StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const selectedCollection = 'Table'


const Logo = require('../../assets/Logo.png');
var loading = true;
var imageLoading = true;
export default class Category extends Component {
  
  
  

  constructor(props){
    super(props);
    this.state = { categoriesArray: [],imageHolder:'' };
    this.category = firestore().collection(this.props.route.params.selectedCategory).onSnapshot(querySnapshot => {
      const arr = [];

      querySnapshot.forEach(documentSnapshot => {
        arr.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      this.setState({categoriesArray : arr})
    })
    loading = false
  }
  async getUrl(img){
    const url = await storage().ref(img).getDownloadURL;
    this.setState({imageHolder:url});
    imageLoading = false
  }

  renderFileUri() {
    
    if (this.state.imageHolder) {
      return <Image source={{uri: this.state.imageHolder}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.images}
        />
      );
    }
  }

  render() {
    if (loading) {
      return <View><Text>LOADING DATA...</Text></View>;
    }
    return (
      <View style={{justifyContent:'center',alignItems:'center',height:windowHeight,backgroundColor:'#F6F0E7'}}>
          
          <FlatList data={this.state.categoriesArray}
          renderItem = {({item})=>(
            <View>
              {this.renderFileUri()}
            <Text>
              {item.iName}
            </Text>
            </View>
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
  },
  
});

