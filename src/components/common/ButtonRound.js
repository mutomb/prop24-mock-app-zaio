/**reusable button */
import React from 'react';
import { Text, TouchableHighlight, View, ImageBackground } from 'react-native';

const ButtonRound = ({ onPress, children, icon, style }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableHighlight onPress={onPress} underlayColor='#fff' style={[buttonStyle, style]}>
            <ImageBackground
            style={{ 
                flex: 1,
                width: 90,
                height: undefined,
                alignSelf: 'center'
            }}  
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
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        elevation: 5,
        width: 75,
        height: 75,
        borderRadius: 37.5,
        position: 'absolute',                                          
        bottom: 30,                                                    
        right: 20
    },
    viewStyle: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center',
        alignItems: 'center', 
        flex: 1,
    }
};
 
