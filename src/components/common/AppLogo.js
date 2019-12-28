import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const AppLogo = ({ style, imageStyle }) => (
      <View style={[styles.viewStyle, style]}>
        <Image 
        source={require('../../../assets/logo.png')}
        style={[styles.imageStyle, imageStyle]} 
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
    flex: 0.64,
    width: Dimensions.get('window').width,
    height: null,
    resizeMode: 'contain'
  }
};
