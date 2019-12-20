/**reusable button */
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { RED } from './Colors';
const Button = ({ onPress, children, style, underlayColor, textStyle }) => {

    return (
        <TouchableHighlight onPress={onPress} underlayColor={ underlayColor || '#CC0000' } style={[styles.buttonStyle, style]}>
            <View>
                <Text style={[styles.textStyle, textStyle]}>
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
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        paddingTop: 5,
        paddingBottom: 5,
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: RED,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingVertical: 10,
        elevation: 2,
    }
};
