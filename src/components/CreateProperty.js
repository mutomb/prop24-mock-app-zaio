import React, { Component } from 'react';
import { ScrollView, View, Text, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'; 
import { resetForm, propertyCreate, uploadImage } from '../actions';
import {
    Button, Card, CardSection, Info, Header, AppLogo,
    BLUE_DARK, BLUE, Spinner, 
} from './common';
import PropertyForm from './PropertyForm';

class CreateProperty extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
        this.state = { 
            showOnCompleteModal: false,
            showLoadingModal: false,
            keyboardDidShowListener: Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this)),
            keyboardDidHideListener: Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this)),
            marginBottom: 0
        };
    }
    _keyboardDidShow(e) {
        this.setState({ marginBottom: e.endCoordinates.height + 100 });
     }
     
     _keyboardDidHide() {
        this.setState({ marginBottom: 0 });
    }
    onCreatePress() {
        const { name, address, image, price } = this.props;
        this.props.propertyCreate({ name, address, price, image });
    }
    renderButtons() {
        if (this.props.loading) {
            return (
                <CardSection style={[styles.CardSectionStyle, { flexDirection: 'row', marginBottom: this.state.marginBottom }]}>
                    <Spinner size='large' />
                </CardSection>

            );
        }
        return (
            <CardSection style={[styles.CardSectionStyle, { flexDirection: 'row', marginBottom: this.state.marginBottom }]}>
                <Button
                style={{ backgroundColor: BLUE }}
                underlayColor={BLUE_DARK}
                onPress={() => Actions.pop()}
                >
                    CANCEL
                </Button>
                <Button
                style={{ backgroundColor: BLUE }}
                underlayColor={BLUE_DARK}
                onPress={this.onCreatePress.bind(this)}
                >
                    CREATE
                </Button>
            </CardSection>
        );
    } 
    renderError() {
        if (this.props.error) {
            return (
            <CardSection style={[styles.CardSectionStyle, { flexDirection: 'row', }]}>
                <Text>{ this.props.error }</Text>
            </CardSection>
            );
        }
        return;
    }
    onCompleted() {
        this.props.resetForm();
         setTimeout(() => {
            this.setState({ showOnCompleteModal: true });
            setTimeout(() => {
                this.setState({ showOnCompleteModal: false }, () => {
                    Actions.pop();
                });
            }, 3000);
        }, 1000);
    }
    onLoading() {
        this.props.resetForm();
        setTimeout(() => {
           this.setState({ showLoadingModal: true });
           setTimeout(() => {
               this.setState({ showLoadingModal: false });
           }, 3000);
       }, 1000);
   }
    render() {
        if (this.props.completed) {
            this.onCompleted();
        }
        if (this.props.loading) {
            this.onLoading();
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header style={{ marginTop: 0, elevation: 2, borderBottomColor: 'rgba(26, 85, 164, 0.1)', borderBottomWidth: 1, }}>
                <AppLogo />
            </Header>
            <ScrollView>
            <Card 
            style={{
                marginLeft: 0,
                marginRight: 0,
                backgroundColor: '#fff',
                paddingTop: 0,
                marginBottom: 0,
                }}
            >
                <PropertyForm {...this.props} />
            </Card>
            {this.renderError()}
            {this.renderButtons()}
            </ScrollView>
            <Info visible={this.state.showOnCompleteModal}>
                <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}> Done!</Text>
            </Info> 
            <Info visible={this.state.showLoadingModal}>
                <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}> Please wait...</Text>
            </Info>           
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

const mapStateToProps = (state) => {
    const { name, address, price, image, loading, error, completed } = state.propertyForm;
    return { name, address, price, image, loading, error, completed };
};
export default connect(mapStateToProps, { resetForm, propertyCreate, uploadImage })(CreateProperty);
