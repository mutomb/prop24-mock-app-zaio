/**resuable card section container */
import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    const { containerStyle } = styles;
    return (
        <View style={[containerStyle, props.style]}>
            {props.children}
        </View>
    );    
};

export { CardSection };

const styles = {
    containerStyle: {
     borderWidth: 5,
     paddingHorizontal: 5,
     paddingVertical: 15,
     justifyContent: 'flex-start',
     flexDirection: 'row',   
     borderColor: '#ddd',
     position: 'relative', 
     backgroundColor: 'rgba(241, 194, 50, 0.6)'
    }
};

