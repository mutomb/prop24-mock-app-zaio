/**reusable button */
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ButtonLogout = ({ onPress }) => (
        <TouchableOpacity
        style={styles.button1}
        onPress={onPress}
        >
            <Image 
            source={require('../../../assets/lock_closed.png')}
            style={{ width: 35, height: 35, opacity: 0.9 }}
            />
        </TouchableOpacity>
    );

export { ButtonLogout };

const styles = {
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.0)',
        padding: 0,
    },
};
 
