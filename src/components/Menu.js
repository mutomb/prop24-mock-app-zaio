import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
import firebase from 'firebase';
import {RED, BLUE, RED_LIGHT } from './common';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#fff',
  },
  logoContainer: {
    backgroundColor: '#fff',
    marginTop: 50,
    paddingLeft:20,
  },
  logo: {
    width: window.width-150,
    resizeMode: 'contain',
    height: 100,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: RED,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: BLUE
  },
});

export default function Menu({ onItemSelected, currentSelection }) {
  const { currentUser }= firebase.auth();
  if(!currentUser){
    return(
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/logo.png')}
            />
          </View>
          <TouchableHighlight 
          onPress={() => onItemSelected('login')}
          underlayColor={RED_LIGHT}
          style={[styles.avatarContainer, 
            { borderBottomWidth: currentSelection==='login'? 3 : 0 }
            ]}
          >
          <View>
            <Image
              style={styles.avatar}
              source={require('../../assets/key.png')}
            />
            <Text
              style={styles.name}
            >
              Sign In
            </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
          style={[styles.avatarContainer, 
            { borderBottomWidth: currentSelection==='signUp'? 3 : 0 }]
          }
            onPress={() => onItemSelected('signUp')}
            underlayColor={RED_LIGHT}
          >
              <View>
              <Image
                style={styles.avatar}
                source={require('../../assets/edit.png')}
              />
              <Text
                style={styles.name}
              >
                Create account
              </Text>
              </View>
          </TouchableHighlight>
        </ScrollView>
    );
  }
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
      </View>
      <TouchableHighlight 
      style={[styles.avatarContainer, { borderBottomWidth: currentSelection==='listing'? 3 : 0 }]}
      underlayColor={RED_LIGHT}                
      onPress={() => onItemSelected('listing')}
      >
        <View>
        <Image
          style={styles.avatar}
          source={require('../../assets/list.png')}
        />
        <Text
          style={styles.name}
        >
          Listing
        </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight 
      style={[styles.avatarContainer, { borderBottomWidth: currentSelection==='profile'? 3 : 0 }]}
      onPress={() => onItemSelected('profile')}
      underlayColor={RED_LIGHT}
      >
        <View>
        <Image
          style={styles.avatar}
          source={require('../../assets/administrator.png')}
        />
        <Text
          style={styles.name}
        >
          Profile
        </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight 
      style={[styles.avatarContainer, { borderBottomWidth: currentSelection==='logout'? 3 : 0 }]}
      underlayColor={RED_LIGHT}
      onPress={() => onItemSelected('logout')}
      >
        <View>
        <Image
          style={styles.avatar}
          source={require('../../assets/lock_closed.png')}
        />
        <Text
          style={styles.name}
        >
          Logout
        </Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};