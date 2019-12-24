import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux'; 
import { userAuthFormUpdate, resetForm } from '../actions';
import { Input, Button, Card, CardSection, Header, AppLogo } from './common';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
    }
    onChangeText({ prop, value }) {
        this.props.userAuthFormUpdate({ prop, value });
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
                        Welcome New User,
                    </Text>
                    <Text style={[styles.headerText2, { alignSelf: 'center' }]}>
                        Sign up to get started
                    </Text>
                </CardSection>
                <CardSection>
                    <Input 
                    label='FullName' 
                    placeholder='Billy Johnson'
                    onChangeText={fullname => this.onChangeText({
                        prop: 'fullname',
                        value: fullname
                    })}
                    value={this.props.fullname}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                    label='Email' 
                    placeholder='user@email.com'
                    onChangeText={email => this.onChangeText({
                        prop: 'email',
                        value: email
                    })}
                    value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                    label='Password' 
                    placeholder='password'
                    secureTextEntry 
                    onChangeText={password => this.onChangeText({
                        prop: 'password',
                        value: password
                    })}
                    value={this.props.password}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                    label='Confirm Password' 
                    placeholder='password'
                    secureTextEntry 
                    onChangeText={password => this.onChangeText({
                        prop: 'confirmPassword',
                        value: password
                    })}
                    value={this.props.confirmPassword}
                    />
                </CardSection>
                <CardSection>
                    <Button>
                        Sign up
                    </Button>
                </CardSection>
            </Card>
            </ScrollView>           
            </View>     
        );
    }
}
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

const mapStateToProps = (state) => {
    const { fullname, email, password, confirmPassword } = state.authForm;
    return { fullname, email, password, confirmPassword };
};
export default connect(mapStateToProps, { userAuthFormUpdate, resetForm })(SignUpForm);
