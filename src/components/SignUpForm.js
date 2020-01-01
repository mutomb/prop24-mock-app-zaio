import React, { Component } from 'react';
import { ScrollView, Text, View, Keyboard, Dimensions } from 'react-native';
import { connect } from 'react-redux'; 
import { Bubbles } from 'react-native-loader';
import { userAuthFormUpdate, resetForm, signUpUser } from '../actions';
import { 
    Input, Button, Card, CardSection, Header, AppLogo, 
    RED, BLUE
} from './common';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
        this.state = {
            marginBottom: 0
        };
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
    onChangeText({ prop, value }) {
        this.props.userAuthFormUpdate({ prop, value });
    }
    onCreatePress() {
        const { username, email, password } = this.props;
        this.props.signUpUser({ username, email, password });
    }
    renderButton() {
        if (this.props.loading) {
            return <Bubbles size={10} color={RED} />;
        }
        return (
            <Button
            onPress={this.onCreatePress.bind(this)}
            >
                Create
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
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header>
                <AppLogo />
            </Header>
            <ScrollView>
            <Card style={{ marginBottom: this.state.marginBottom, }}>
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
                <CardSection style={[styles.cardSection, { borderRadius: 0 }]}>
                    <Input 
                    label='FullName' 
                    placeholder='Billy Johnson'
                    onChangeText={fullname => this.onChangeText({
                        prop: 'fullname',
                        value: fullname
                    })}
                    value={this.props.fullname}
                    style={styles.inputStyle}
                    />
                </CardSection>
                <CardSection style={[styles.cardSection, { borderRadius: 0 }]}>
                    <Input 
                    label='Email' 
                    placeholder='user@email.com'
                    onChangeText={email => this.onChangeText({
                        prop: 'email',
                        value: email
                    })}
                    value={this.props.email}
                    style={styles.inputStyle}
                    />
                </CardSection>
                <CardSection style={[styles.cardSection, { borderRadius: 0 }]}>
                    <Input 
                    label='Password' 
                    placeholder='password'
                    secureTextEntry 
                    onChangeText={password => this.onChangeText({
                        prop: 'password',
                        value: password
                    })}
                    value={this.props.password}
                    style={styles.inputStyle}
                    />
                </CardSection>
                <CardSection style={[styles.cardSection, { borderRadius: 0 }]}>
                    <Input 
                    label='Confirm Password' 
                    placeholder='password'
                    secureTextEntry 
                    onChangeText={password => this.onChangeText({
                        prop: 'confirmPassword',
                        value: password
                    })}
                    value={this.props.confirmPassword}
                    style={styles.inputStyle}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection style={[{ paddingBottom: 50, borderRadius: Dimensions.get('window').width / 10, borderTopLeftRadius: 0, borderTopRightRadius: 0 }, styles.cardSection]}>
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
    },
    inputStyle: {
        borderRadius: 10
    }
};

const mapStateToProps = (state) => {
    const { fullname, email, password, confirmPassword, loading, error } = state.authForm;
    return { fullname, email, password, confirmPassword, loading, error };
};
export default connect(mapStateToProps, { userAuthFormUpdate, signUpUser, resetForm })(SignUpForm);
