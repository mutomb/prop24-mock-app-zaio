/**resuable text input */
import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
        const { inputStyle, labelStyle, containerStyle } = styles;

        return (
        <View style={containerStyle}>
            <Text style={labelStyle}>
                {label}
            </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                selectionColor='#D56217'
            />
        </View>
        );
};

const styles = {
    inputStyle: {
        color: '#000',
        backgroundColor: '#D4E9FF',
        paddingRight: 5,
        paddingLeft: 18,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        borderColor: '#1FCCFF',
        borderWidth: 3,
        borderRadius: 10,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }

};


export { Input };
