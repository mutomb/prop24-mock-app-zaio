/**reusable Header section container */
import React from 'react';
import { View, Dimensions} from 'react-native';

const Header = ({ children }) => {
    const { viewStyle } = styles;
    console.log(children);
    return (
        <View style={viewStyle}>
            {children}
        </View>
    );
};
  
export { Header };

const styles = { 
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        position: 'relative',
        marginTop: 100,
        width: Dimensions.get('window').width,
        height: 100,
    }
};

