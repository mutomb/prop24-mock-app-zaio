import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component { 
    onRowPress() {
        const { property } = this.props;
       Actions.propertyEdit({ property });
    }

    render() {
        const { name } = this.props.property;
        return (
            <TouchableOpacity
                onPress={this.onRowPress.bind(this)}
            >
            <CardSection style={styles.CardSectionStyle}>
                <Text style={styles.titleStyle}>
                    {name}
                </Text>
            </CardSection>
            </TouchableOpacity>
        );
    }
}
export default ListItem;

const styles = {
    titleStyle: {
        paddingLeft: 15,
        fontSize: 18
    },
    CardSectionStyle: {
        shadowColor: '#1FCCFF',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 10,
        paddingVertical: 20, 
        backgroundColor: 'rgba(241, 194, 50, 0.8)', 
        borderRadius: 10 
    }
};
