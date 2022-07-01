/* eslint-disable prettier/prettier */
import React, {Fragment, Component} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {TextInput} from 'react-native-gesture-handler';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArray: [],
      fileUri: '',
      selectedItem: '',
      itemName: '',
      itemDesc: '',
      imageName: '',
      imgURL: '',
    };
    this.category = firestore()
      .collection('Categories')
      .onSnapshot(querySnapshot => {
        const arr = [];

        querySnapshot.forEach(documentSnapshot => {
          arr.push(documentSnapshot.id);
        });
        this.setState({categoriesArray: arr});
      });
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        selectionLimit: 0,
      },
    };
    launchCamera(options, response => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.setState({
          fileUri: response.assets[0].uri,
          itemName: this.props.route.params.userId,
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.setState({
          fileUri: response.assets[0].uri,
          itemName: this.props.route.params.userId,
        });
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.images}
        />
      );
    }
  }

  uploadImageToStorage(path, imgName) {
    this.setState({isLoading: true});
    let reference = storage().ref(imgName);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log('Image uploaded to the bucket!');
        this.setState({
          isLoading: false,
          status: 'Image uploaded successfully',
        });
      })
      .catch(e => {
        console.log('uploading image error => ', e);
        this.setState({isLoading: false, status: 'Something went wrong'});
      });

  }

  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.body}>
              <View style={styles.ImageSections}>
                <View>{this.renderFileUri()}</View>
              </View>

              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.launchCamera}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Directly Launch Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.launchImageLibrary}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>
                    Directly Launch Image Library
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width:windowWidth,height:windowHeight*0.04,marginVertical:windowHeight*0.01,flexDirection:"row",textAlign:"center"}}>
                <Text
                style={{width:windowWidth,fontSize:20,marginLeft:windowWidth*0.05,backgroundColor:"#D1C8BA",height:64,paddingTop:windowHeight*0.01,paddingLeft:windowWidth*0.02}}
                >Please send us your photo when you are holding your student ID </Text>
               
              </View>
              
           
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  disabled={!this.state.fileUri}
                  onPress={() => {
                    this.uploadImageToStorage(
                      this.state.fileUri,
                      'studentImages://' + this.state.itemName,
                    );
                    this.props.navigation.navigate('Menu', {title: 'Menu Sayfasi'});
                  }}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor:"#F6F0E7",
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#D1C8BA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: windowHeight*0.017,
    fontWeight: 'bold',
  },
});
