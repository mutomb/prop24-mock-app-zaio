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
        marginLeft: 30,
        marginRight: 30,
        backGroundColor: '#fff',
        borderRadius: 2,
        alignSelf: 'stretch',
    }
};

export { Card };
