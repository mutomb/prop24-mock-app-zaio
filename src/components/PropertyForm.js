import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'; 
import { propertyFormUpdate, resetForm } from '../actions';
import {
    Input, Button, Card, CardSection, 
    BLUE_DARK, BLUE,
    Confirm
} from './common';
import PropertyImagePicker from './PropertyImagePicker';

class PropertyForm extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
        this.state = {
            showModal: false
        };
    }

    onChangeText({ prop, value }) {
        this.props.propertyFormUpdate({ prop, value });
    }

    deleteProperty() {
        this.setState({ showModal: true });
    }
    renderDeleteButton() {
        if (this.props.editEmployee) {
            return (
                <Button
                onPress={this.deleteProperty.bind(this)}
                style={{ backgroundColor: 'red' }}
                textStyle={{ fontSize: 10 }}
                underlayColor={BLUE_DARK}
                >
                DELETE
                </Button>
            );
        }
        return;
    }
    render() {
        return (
            <View>
            <Confirm
                title='Warning'
                visible={this.state.showModal}
                onDecline={() => this.setState({ showModal: false })}
            >
                Do you want to delete this property?
            </Confirm>
            <Card
             style={{
                marginLeft: 0,
                marginRight: 0,
                backgroundColor: '#fff',
                marginBottom: 0,
                marginTop: 0,
                }}
            >
                <CardSection
                    style={[styles.CardSectionStyle, {
                     justifyContent: 'flex-start', marginBottom: 0, }]}
                >
                    <Text style={[styles.textStyle, { flex: 3 }]}>
                        Property Images
                    </Text>
                    {this.renderDeleteButton()}
                </CardSection>
                <CardSection style={styles.CardSectionStyle}>
                    <PropertyImagePicker image={this.props.image} />
                </CardSection>
                <CardSection style={[styles.CardSectionStyle, { justifyContent: 'flex-start' }]}>
                    <Text style={styles.textStyle}>
                        Property Details
                    </Text>
                </CardSection>

                <CardSection
                    style={[styles.CardSectionStyle, {
                    flexDirection: 'column',
                    borderWidth: 3,
                    borderColor: BLUE_DARK,
                    borderRadius: 5,
                    elevation: 5
                    }]}
                >
                    <CardSection style={styles.CardSectionStyle}>
                        <Input 
                        label='Name' 
                        placeholder=' 2 bed room house'
                        onChangeText={name => this.onChangeText({
                            prop: 'name',
                            value: name
                        })}
                        value={this.props.name}
                        style={styles.inputStyle}
                        labelStyle={{ color: '#000' }}
                        />
                    </CardSection>
                    <CardSection style={styles.CardSectionStyle}>
                        <Input 
                        label='Address' 
                        placeholder='10 Fredrick street Capetown'
                        onChangeText={address => this.onChangeText({
                            prop: 'address',
                            value: address
                        })}
                        value={this.props.address}
                        style={styles.inputStyle}
                        labelStyle={{ color: '#000' }}
                        />
                    </CardSection>
                    <CardSection style={styles.CardSectionStyle}>
                        <Input 
                        label='Price' 
                        placeholder='R120'
                        onChangeText={price => this.onChangeText({
                            prop: 'price',
                            value: price
                        })}
                        value={this.props.price}
                        style={styles.inputStyle}
                        labelStyle={{ color: '#000' }}
                        />
                    </CardSection>
                </CardSection >
            </Card>
            </View>     
        );
    }
}
const styles = {
    CardSectionStyle: {
        backgroundColor: '#fff',
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 0
    },
    inputStyle: {
        borderBottomColor: BLUE,
        backgroundColor: '#F4F4F4',
        elevation: 2
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
    }
};

export default connect(null, { propertyFormUpdate, resetForm })(PropertyForm);
