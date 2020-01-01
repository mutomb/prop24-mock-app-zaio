/**reusable modal container */
import React, { useState, useEffect } from 'react';
import { View, Modal, Image } from 'react-native';
import { RED } from './Colors';

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
                <View style={styles.iconContainer}>
                    <Image 
                        source={require('../../../assets/icon.png')}
                        style={[styles.icon]}
                        resizeMode='contain'
                    />
                </View>
                <View style={{ flex: 1 }}>
                {children}
                </View>
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
        flexDirection: 'column',
    },
    iconContainer: { 
        flex: 3, 
        alignSelf: 'stretch', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    icon: {
        alignSelf: 'center', 
        opacity: 0.2,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: RED, 
        width: 100,
        height: 100,
    }
};

export { Info };
