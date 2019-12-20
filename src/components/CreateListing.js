import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'; 
import { listingFormUpdate, resetForm } from '../actions'
import {
    Input, Button, Card, CardSection, 
    Spinner, Header, AppLogo, BLUE_DARK, BLUE, RED,
} from './common';
import PropertyImagePicker from './PropertyImagePicker';
import PropertyForm from './PropertyForm';

class CreateListing extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
        this.state ={
            image: null,
            capture: true
        }
    }
    onChangeText({prop,value}) {
        console.log(prop)
        this.props.listingFormUpdate({prop, value});
    }
    setPickedImage(image) {
        this.setState({image})
    }
    captureImage() {
        Actions.ProppertyImageCapture();
    }
    render() {

        return (
            <View style={{flex:1}}>
            <ScrollView>
            <Card style={{
                marginLeft: 0,
                marginRight: 0,
                backgroundColor: '#fff',
                paddingTop: 0,
                }}>
                <PropertyForm {...this.props} />
                <CardSection style={[styles.CardSectionStyle, {flexDirection: 'row',}]}>
                    <Button
                    style={{backgroundColor: BLUE}}
                    underlayColor={BLUE_DARK}
                    onPress={()=>Actions.pop()}
                    >
                        CANCEL
                    </Button>
                    <Button
                    style={{backgroundColor: BLUE}}
                    underlayColor={BLUE_DARK}
                    >
                        CREATE
                    </Button>
                </CardSection>
            </Card>
            </ScrollView>           
            </View>     
        )
    }
}
const styles= {
    CardSectionStyle: {
        backgroundColor:'#fff',
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
}

const mapStateToProps = (state) =>{
    const { name, address, price } = state.listingForm;
    return { name, address, price };
}
export default connect(mapStateToProps,{ listingFormUpdate, resetForm })(CreateListing);