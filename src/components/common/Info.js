/**reusable modal container */
import React from 'react';
import { View, Modal } from 'react-native';

const Info = ({ children, visible }) => {
    const { containerStyle } = styles;
    return (
        <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                {children}
            </View>
        </Modal>
    );
};
const styles = {
    containerStyle: {
        backgroundColor: 'rgba(26, 85, 164, 0.5)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export { Info };
