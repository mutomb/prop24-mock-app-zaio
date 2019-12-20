/**resuable text input */
import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import { RED } from './Colors';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, style, labelStyle }) => {
        const { inputStyle, containerStyle } = styles;
        const [focused, setFocus] = useState(false);
        const inputFocus= () => {
            setFocus(true);
        }
        const inputBlur =() => {
            setFocus(false);
        }
        return (
        <View style={containerStyle}>
            <Text style={[styles.labelStyle, labelStyle]}>
                {label}
            </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={focused? (''):(placeholder)}
                placeholderTextColor='#000'
                autoCorrect={false}
                style={[inputStyle,{borderBottomWidth: focused? (3):(1)}, style]}
                value={value}
                onChangeText={onChangeText}
                selectionColor='#CC0000'
                onFocus={inputFocus.bind(this)}
                onBlur={inputBlur.bind(this)}
            />
        </View>
        );
};

const styles = {
    containerStyle: {
        height: 100,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    inputStyle: {
        color: '#000',
        backgroundColor: '#fff',
        paddingRight: 5,
        paddingLeft: 18,
        fontSize: 20,
        lineHeight: 25,
        flex: 1,
        alignSelf: 'stretch',
        height:100,
        borderBottomColor: RED, 
        elevation: 3       
    },
    labelStyle: {
        fontSize: 18,
        flex: 1,
        color: '#fff'
    },
};


export { Input };
