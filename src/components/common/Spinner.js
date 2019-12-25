/**resuable spinner */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, color }) => {
    const { spinnerStyle } = styles;
    return (
        <View style={spinnerStyle}>
            <ActivityIndicator 
            size={size || 'large'} 
            color={color || '#fff'}
            />
        </View>
    );
};

export { Spinner };

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};
