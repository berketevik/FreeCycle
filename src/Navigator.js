/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class Navigator extends Component {
  state = {
    login: [
      {
        sayfa: 'Splash Screen',
        path: 'Splash',
      },
      {
        sayfa: 'SignIn Sayfasi',
        path: 'Signin',
      },
      {
        sayfa: 'Login Sayfasi',
        path: 'Login',
      },
    ],
    sayfalar: [
      {
        sayfa: 'Menu Sayfasi',
        path: 'Menu',
      },
      {
        sayfa: 'Category Sayfasi',
        path: 'Category',
      },
      {
        sayfa: 'Esya Sayfasi',
        path: 'ItemDescription',
      },
      {
        sayfa: 'Notifications',
        path: 'Notifications',
      },
      {
        sayfa: 'Donate',
        path: 'Donate',
      },
      {
        sayfa: 'ChatPage',
        path: 'ChatPage',
      },
      {
        sayfa: 'Profile',
        path: 'Profile',
      },
      {
        sayfa: 'My Products',
        path: 'MyProducts',
      },
      {
        sayfa: 'Verify',
        path: 'Verify',
      },
      {
        sayfa: 'Notifications',
        path: 'Notifications',
      },
    ],
  };

  render() {
    // eslint-disable-next-line no-undef
    click = item => {
      this.props.navigation.navigate(item.path, {title: item.sayfa});
    };

    return (
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Sayfalar</Text>
        <ScrollView>
          <View style={styles.container}>
            {this.props.user === undefined ? this.state.login.map((sayfa, index) => (
              <TouchableOpacity
              key={index}
                onPress={() => click(sayfa)}
                style={styles.item}>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  {index + 1}
                </Text>
                <Text style={{textAlign: 'center'}}>{sayfa.sayfa}</Text>
              </TouchableOpacity>
            )) : 
            this.state.sayfalar.map((sayfa, index) => (
                <TouchableOpacity
                key={index}
                  onPress={() => click(sayfa)}
                  style={styles.item}>
                  <Text style={{textAlign: 'center', fontSize: 20}}>
                    {index + 1}
                  </Text>
                  <Text style={{textAlign: 'center'}}>{sayfa.sayfa}</Text>
                </TouchableOpacity>
              ))}
            
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
  },
  item: {
    width: '33.33%',
    width: '30%',
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    margin: 6,
    padding: 6,
    borderRadius: 5,
    backgroundColor: '#EBD8C3',
  },
  heading: {
    fontSize: 20,
    margin: 8,
  },
});
