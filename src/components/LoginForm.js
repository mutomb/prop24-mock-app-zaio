import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Input, Button, Card, CardSection, Header, AppLogo } from './common';
import { userAuthFormUpdate, resetForm } from '../actions';

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
        Actions.main();
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
                    style={{ paddingBottom: 50, flexDirection: 'column', }}
                >
                    <Text style={[styles.headerText1, { alignSelf: 'center' }]}>
                        Welcome Back,
                    </Text>
                    <Text style={[styles.headerText2, { alignSelf: 'center' }]}>
                        Sign in to continue
                    </Text>
                </CardSection>
                <CardSection>
                    <Input 
                    label='Email' 
                    placeholder='user@email.com'
                    onChangeText={email => (
                        this.onChangeText({ prop: 'email', value: email })
                        )}
                    value={this.props.email}
                    />
                </CardSection>
                <CardSection>
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
                <CardSection>
                    <Button
                    onPress={this.onLoginPress.bind(this)}
                    >
                        Login
                    </Button>
                </CardSection>
                <CardSection
                    style={{ paddingBottom: 50 }}
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
    const { email, password } = state.authForm;
    return { email, password };
};
export default connect(mapStateToProps, { userAuthFormUpdate, resetForm })(LoginForm);

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
    }
};
