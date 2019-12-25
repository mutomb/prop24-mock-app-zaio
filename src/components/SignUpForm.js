import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux'; 
import { userAuthFormUpdate, resetForm, signUpUser } from '../actions';
import { 
    Input, Button, Card, CardSection, Header, AppLogo, Spinner, 
    RED, BLUE
} from './common';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
    }
    onChangeText({ prop, value }) {
        this.props.userAuthFormUpdate({ prop, value });
    }
    onCreatePress() {
        const { username, email, password } = this.props;
        this.props.signUpUser({ username, email, password });
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button
            onPress={this.onCreatePress.bind(this)}
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
                        Welcome New User,
                    </Text>
                    <Text style={[styles.headerText2, { alignSelf: 'center' }]}>
                        Sign up to get started
                    </Text>
                </CardSection>
                <CardSection style={styles.cardSection}>
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
                <CardSection style={styles.cardSection}>
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
                <CardSection style={styles.cardSection}>
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
                <CardSection style={styles.cardSection}>
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
                {this.renderError()}
                <CardSection style={styles.cardSection}>
                    {this.renderButton()}
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
    },
    cardSection: {
        marginBottom: 0,
    }
};

const mapStateToProps = (state) => {
    const { fullname, email, password, confirmPassword, loading, error } = state.authForm;
    return { fullname, email, password, confirmPassword, loading, error };
};
export default connect(mapStateToProps, { userAuthFormUpdate, signUpUser, resetForm })(SignUpForm);
