import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const AppLogo = () => (
      <View style={styles.viewStyle}>
        <Image 
        source={require('../../../assets/logo.png')}
        style={styles.imageStyle} 
        />
      </View>
    );
export { AppLogo };
const styles = {
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 0.5,
    width: Dimensions.get('window').width-10,
    height: null,
    resizeMode: 'contain'
  }
};
