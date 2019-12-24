/**resuable card section container */
import React from 'react';
import { View } from 'react-native';
import { BLUE } from './Colors';

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
     paddingHorizontal: 5,
     paddingVertical: 15,
     justifyContent: 'center',
     flexDirection: 'row',   
     borderColor: BLUE,
     position: 'relative', 
     backgroundColor: BLUE,
     marginBottom: 1,
     borderRadius: 2,
    } 
};

