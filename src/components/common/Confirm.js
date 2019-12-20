/**reusable modal container */
import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from './Button';
import { CardSection } from './CardSection';
import { BLUE_DARK, BLUE } from './Colors';

const Confirm = ({ children, onAccept, onDecline, visible, title }) => {
    const { cardSectionStyle, textStyle, containerStyle } = styles;
    return (
        <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection style={[cardSectionStyle]}>
                    <Text style={[textStyle,{fontWeight: 'bold'}]}>{title}</Text>
                </CardSection>
                <CardSection style={[cardSectionStyle]}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>
                <CardSection
                style={{backgroundColor: '#fff'}}
                >
                    <Button 
                    onPress={onDecline}
                    style={{ backgroundColor: BLUE}}
                    underlayColor={BLUE_DARK}
                    >
                    CANCEL
                    </Button>
                    <Button 
                    onPress={onAccept}
                    style={{ backgroundColor: BLUE}}
                    textStyle={{color: '#fff'}}
                    underlayColor={BLUE_DARK}
                    >
                    OKAY
                    </Button>
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
        backgroundColor: '#ffff'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
};

export { Confirm };
