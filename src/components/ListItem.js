import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {

    onRowPress() {
      const { property } = this.props;
      Actions.editProperty({ property });
    }

    render() {
        const { image, address, name, price } = this.props.property;
        return (
            <TouchableWithoutFeedback
                onPress={this.onRowPress.bind(this)}
            >
            <View style={styles.constainerStyle}>
                <CardSection style={styles.imageSection}>
                {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
                </CardSection>
                <CardSection style={styles.descSection}>
                    <Text style={styles.desc1}>
                        {address}
                    </Text>
                    <Text style={styles.desc2}>
                        {name}
                    </Text>
                    <Text style={styles.desc3}>
                        {price}
                    </Text>
                </CardSection>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default ListItem;

const styles = {
    constainerStyle: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    desc1: {
        paddingLeft: 5,
        fontSize: 20
    },
    desc2: {
        paddingLeft: 5,
        fontSize: 14
    },
    desc3: {
        paddingLeft: 5,
        fontSize: 10
    },
    descSection: {
        paddingVertical: 2, 
        backgroundColor: '#fff', 
        borderRadius: 2,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderTopLeftRadius: 3,
        borderBottomRightRadius: 3,
        elevation: 2
    },
    imageSection: {
        paddingVertical: 2, 
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3, 
        height: 400,
        backgroundColor: '#F4F4F4',
        flexDirection: 'column',
        flex: 1,
        elevation: 2
    },
      imageStyle: {
        height: '100%',
        width: '100%'
    },
};
