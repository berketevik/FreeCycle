/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import {View,Text,Image,StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import {SafeAreaView} from 'react-native-safe-area-context';





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
      <SafeAreaView style={{justifyContent:'center',alignItems:'center',height:windowHeight,backgroundColor:'#F6F0E7'}}>
          <Image
              source={require('../../assets/Logo.png')}
              style={{
                width: (windowHeight * 6) / 100,
                height: (windowHeight * 6) / 100,
                marginHorizontal: 3,
                justifyContent:"flex-start",
                alignSelf:"baseline",
                
              }}
            />
          <FlatList
          columnWrapperStyle={{justifyContent:"space-around"}}
          numColumns={2}
           data={this.state.categoriesArray}
          style={{paddingTop:windowHeight*0.04}}
          renderItem = {({item})=>(
            <View
            style={{paddingTop:windowHeight*0.02,paddingLeft:windowWidth*0.03}}
            >
              {this.renderFileUri()}
            <Text
            style={{justifyContent:"flex-end",alignSelf:"center",backgroundColor:"#314951",width:150,textAlign:"center",height:windowHeight*0.03,paddingTop:windowHeight*0.005}}
            >
              {this.state.categoriesArray.Name}
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
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  
});

