import React, { Component } from 'react';
import { ScrollView, Text, View, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'; 
import { Bubbles, Bars } from 'react-native-loader';
import _ from 'lodash';
import { propertyEdit, propertyFormUpdate, resetForm } from '../actions';
import {
     Button, Card, CardSection, Info, Header, AppLogo,
     BLUE_DARK, BLUE, RED, 
} from './common';
import PropertyForm from './PropertyForm';

class EditProperty extends Component {
    constructor(props) {
        super(props);
        _.each(props.property, (value, prop) => this.props.propertyFormUpdate({ prop, value }));
        this.state = { 
            showLoadingModal: false,
            marginBottom: 0,
            currentImg: props.property.image,
        }
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow(e) {
        this.setState({ marginBottom: e.endCoordinates.height + 100 });
    }
        
    _keyboardDidHide() {
    this.setState({ marginBottom: 0 });
    }
    onSavePress() {
        const { name, address, image, price } = this.props;
        this.props.propertyEdit({ prevImage: this.state.currentImg, name, address, price, image, uid: this.props.property.uid }); 
        this.onLoading();
    }
    renderButtons() {
        if (this.props.loading) {
            return (
                <CardSection 
                style={[styles.CardSectionStyle,
                 { flexDirection: 'row', marginBottom: this.state.marginBottom }
                 ]}
                >
                  <Bars size={10} color={BLUE} />
                </CardSection>
            );
        }
        return (
            <CardSection 
            style={[styles.CardSectionStyle,
             { flexDirection: 'row', marginBottom: this.state.marginBottom 
             }]
             }
            >              
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
                onPress={this.onSavePress.bind(this)}
                >
                    SUBMIT
                </Button>
            </CardSection>
        );
    }
    renderError() {
        if (this.props.error) {
            return (
            <CardSection style={[styles.CardSectionStyle, styles.error]}>
                <Text style={styles.errorText}>{ this.props.error }</Text>
            </CardSection>
            );
        }
        return;
    }
    onLoading() {
        const y = setInterval(() => {
            if (this.props.loading || this.props.completed) {
                this.setState({ showLoadingModal: true });
                if (this.props.completed) {
                    setTimeout(() => {
                        this.setState({ 
                            showLoadingModal: false,
                        }, () => {
                            this.props.resetForm();
                            clearInterval(y);
                            Actions.main({ type: 'reset' });
                        });
                    }, 3000);
                } else if (this.props.error) {
                    this.setState({ showLoadingModal: false });
                }                
            } else if (this.props.error) {
                this.setState({ showLoadingModal: false });
            }
        }, 200);
   }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header style={styles.Header}>
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
                <PropertyForm {...this.props} edit onLoading={this.onLoading.bind(this)} />
            </Card>
            {this.renderError()}
            {this.renderButtons()}
            </ScrollView> 
            <Info visible={this.state.showLoadingModal}>
                 <Bubbles size={20} color={RED} />
            </Info> 
            </View>     
        );
    }
}
const mapStateToProps = (state) => {
    const { name, address, price, image, loading, error, completed } = state.propertyForm;
    return { name, address, price, image, loading, error, completed };
};
export default connect(mapStateToProps, 
    { propertyEdit, propertyFormUpdate, resetForm }
    )(EditProperty);

const styles = {
    Header: {
        marginTop: 0, 
        elevation: 2, 
        borderBottomColor: 'rgba(26, 85, 164, 0.1)', 
        borderBottomWidth: 1, 
   },
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
    },    
    error: { 
        marginTop: 10, 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '70%', 
        alignSelf: 'center', 
        fontSize: 20, 
        backgroundColor: 'red', 
        borderLeftWidth: 10, 
        borderLeftColor: BLUE 
    },
    errorText: { 
        flex: 1, 
        color: '#fff', 
        fontWeight: 'bold' 
    }
};

