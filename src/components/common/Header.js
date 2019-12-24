/**reusable Header section container */
import React from 'react';
import { View, Dimensions } from 'react-native';

const Header = ({ children, style }) => {
    const { viewStyle } = styles;
    return (
        <View style={[viewStyle, style]}>
            {children}
        </View>
    );
};
  
export { Header };

const styles = { 
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        position: 'relative',
        marginTop: 30,
        width: Dimensions.get('window').width,
        height: 100,
    }
};

