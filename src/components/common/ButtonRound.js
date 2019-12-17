/**reusable button */
import React from 'react';
import { Text, TouchableHighlight, View, ImageBackground } from 'react-native';

const ButtonRound = ({ onPress, children, icon, style }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableHighlight onPress={onPress} underlayColor='#04B8FF' style={[buttonStyle, style]}>
            <ImageBackground
            style={{ flex: 1 }}      
            source={icon}   
            >
                <View style={styles.viewStyle}>
                <Text style={textStyle}>
                { children}
                </Text> 
                </View>
            </ImageBackground>
        </TouchableHighlight>
    );  
};

export { ButtonRound };

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonStyle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#D56217',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        shadowColor: '#1FCCFF',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 10,
    },
    viewStyle: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center',
         alignItems: 'center' 
        }
};
