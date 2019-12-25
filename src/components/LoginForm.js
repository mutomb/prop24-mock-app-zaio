import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Input, Button, Card, CardSection, Header, AppLogo, Spinner, RED, BLUE } from './common';
import { userAuthFormUpdate, resetForm, signInUser } from '../actions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
        this.state = { underLine: false };
    }
    underLine() {
        this.setState({ underLine: true });
    }
    removeUnderLine() {
        this.setState({ underLine: false });
    }
    toSignUpPage() {
        Actions.signUp();     
    }
    onChangeText({ prop, value }) {
        this.props.userAuthFormUpdate({ prop, value });
    }
    onLoginPress() {
       // Actions.main();
        const { email, password } = this.props; 
        this.props.signInUser({ email, password });        
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button
            onPress={this.onLoginPress.bind(this)}
            >
                Login
            </Button>
        );
    }
    renderError() {
        if (this.props.error) {
            return (
            <Text 
            style={{ color: RED, 
                backgroundColor: BLUE, 
                paddingHorizontal: 10 
            }}
            >
            {this.props.error}
            </Text>);
        }
    }
    render() {
        return (
            <View>
            <Header>
                <AppLogo />
            </Header>
            <ScrollView>
            <Card>
                <CardSection
                    style={[{ paddingBottom: 50, flexDirection: 'column' }, styles.cardSection]}
                >
                    <Text style={[styles.headerText1, { alignSelf: 'center' }]}>
                        Welcome Back,
                    </Text>
                    <Text style={[styles.headerText2, { alignSelf: 'center' }]}>
                        Sign in to continue
                    </Text>
                </CardSection>
                <CardSection style={styles.cardSection}>
                    <Input 
                    label='Email' 
                    placeholder='user@email.com'
                    onChangeText={email => (
                        this.onChangeText({ prop: 'email', value: email })
                        )}
                    value={this.props.email}
                    />
                </CardSection>
                <CardSection style={styles.cardSection}>
                    <Input 
                    label='Password' 
                    placeholder='password'
                    secureTextEntry 
                    onChangeText={password => (
                        this.onChangeText({ prop: 'password', value: password })
                        )}
                    value={this.props.password}
                    />
                </CardSection>
                    {this.renderError()}
                <CardSection style={styles.cardSection}>
                {this.renderButton()}
                </CardSection>
                <CardSection
                    style={[{ paddingBottom: 50 }, styles.cardSection]}
                >
                    <Text style={[styles.footerTextStyle]}>
                        New user ?
                    </Text>
                    <TouchableWithoutFeedback
                        onPressIn={this.underLine.bind(this)}
                        onPressOut={this.removeUnderLine.bind(this)}
                        onPress={this.toSignUpPage.bind(this)}
                    >
                        <Text
                            style={[styles.footerTextStyle, {
                                color: '#000', 
                                fontWeight: '900',
                                borderBottomWidth: this.state.underLine ? (2) : (0)
                            }]}
                        >
                            SignUp
                        </Text>
                    </TouchableWithoutFeedback>
                </CardSection>
            </Card>
            </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    const { email, password, loading, error } = state.authForm;
    console.log(email, password, loading, error);
    return { email, password, loading, error };
};
export default connect(mapStateToProps, { 
    userAuthFormUpdate, resetForm, signInUser
})(LoginForm);

const styles = {
    footerTextStyle: {
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: 5,
        borderBottomColor: '#fff',
    },
    headerText1: {
        color: '#fff',
        fontSize: 25,
        paddingHorizontal: 5,
    },
    headerText2: {
        color: 'grey',
        fontSize: 16,
        paddingHorizontal: 5,
    },   
    cardSection: {
        marginBottom: 0,
    }
};
