import React, { Component } from 'react';
import { ScrollView, Text, View, Keyboard, Dimensions, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'; 
import { Bubbles } from 'react-native-loader';
import SideMenu from 'react-native-side-menu';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux';
import { userAuthFormUpdate, resetForm, signUpUser } from '../actions';
import { 
    Input, Button, Card, CardSection, Header, AppLogo, 
    RED, BLUE, BLUE_DARK
} from './common';
import Menu from './Menu';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        props.resetForm();
        this.state = {
            marginBottom: 0,
            isOpen: false,
            selectedItem: 'signUp', 
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
            <CardSection style={[styles.CardSectionStyle, styles.error]}>
                <Text style={styles.errorText}>{ this.props.error }</Text>
            </CardSection>
            );
        }
        return;
    }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected(item) {
        this.setState({
          isOpen: false,
          selectedItem: item,
        });
        if(item==='login'){
            Actions.login();
        }
    }
    onSwipeRight(gestureState) {
        this.setState({
            isOpen: true
        })
    }
    onSwipeLeft(gestureState) {
        this.setState({
            isOpen: false
        })
    }
    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)} currentSelection={this.state.selectedItem} />;
        const config = {
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80
        };
        return (
            <GestureRecognizer
                onSwipeLeft={this.onSwipeLeft.bind(this)}
                onSwipeRight={this.onSwipeRight.bind(this)}
                config={config}
                style={{
                  flex: 1,
                }}
            >
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
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
                    <CardSection style={[styles.cardSection, { borderRadius: 0 }]}>
                        {this.renderError()}
                    </CardSection>
                    <CardSection style={[{ paddingBottom: 50, borderRadius: Dimensions.get('window').width / 7, borderTopLeftRadius: 0, borderTopRightRadius: 0 }, styles.cardSection]}>
                        {this.renderButton()} 
                    </CardSection>
                </Card>
                </ScrollView> 
                <TouchableOpacity
                  onPress={this.toggle.bind(this)}
                  style={styles.Menubutton}
                >
                  <Image
                    source={this.state.isOpen? require('../../assets/arrow_left.png'):require('../../assets/arrow_right.png')}
                    style={{ width: 50, height: 50}}
                  />
                </TouchableOpacity>          
                </View>   
           </SideMenu> 
           </GestureRecognizer>
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
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: 5,
    },
    cardSection: {
        marginBottom: 0,
        borderRadius: 0
    },
    inputStyle: {
        borderRadius: 10
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
        borderLeftColor: BLUE_DARK 
    },
    errorText: { 
        flex: 1, 
        color: '#fff', 
        fontWeight: 'bold' 
    },
    CardSectionStyle: {
        backgroundColor: BLUE,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 0
    },
    Menubutton: { /** side menu**/
        position: 'absolute',
        top: Dimensions.get('window').height-100,
        padding: 10,
        elevation: 3
  },
};

const mapStateToProps = (state) => {
    const { fullname, email, password, confirmPassword, loading, error } = state.authForm;
    return { fullname, email, password, confirmPassword, loading, error };
};
export default connect(mapStateToProps, { userAuthFormUpdate, signUpUser, resetForm })(SignUpForm);
