/**reusable button */
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableHighlight onPress={onPress} underlayColor='#43B2C9' style={buttonStyle}>
            <View>
                <Text style={textStyle}>
                { children}
                </Text>
            </View>
        </TouchableHighlight>
    );  
};

export { Button };

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#D56217',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingVertical: 10,
        shadowColor: '#1FCCFF',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 10,
    }
};
