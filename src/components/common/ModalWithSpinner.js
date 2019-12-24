/**reusable modal container */
import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Spinner } from './Spinner';

const ModalWithSpinner = ({ children, visible }) => {
    const { textStyle, containerStyle } = styles;
    return (
        <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <Spinner size={'large'} />
                <Text style={textStyle}>{children}</Text>
            </View>
        </Modal>
    );
};
const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    cardSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        color: '#fff'
    }
};

export { ModalWithSpinner };
