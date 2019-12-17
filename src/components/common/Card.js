/**reusable card container */
import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    const { containerStyle } = styles;
    return (
        <View style={[containerStyle, props.style]}>
            { props.children }
        </View>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 22,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'rgba(241, 194, 50, 0.6)',
    }
};

export { Card };
