/**reusable modal container */
import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from './Button';
import { CardSection } from './CardSection';

const Confirm = ({ children, onAccept, onDecline, visible }) => {
    const { cardSectionStyle, textStyle, containerStyle } = styles;
    return (
        <Modal
        visible={visible}
        transparent
        animationType='slide'
        onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>
                <CardSection>
                    <Button onPress={onDecline}>No</Button>
                    <Button onPress={onAccept}>Yes</Button>
                </CardSection>
            </View>
        </Modal>
    );
};
const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    cardSectionStyle: {
        justifyContent: 'center',
        backgroundColor: '#FFC038'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    }
};

export { Confirm };
