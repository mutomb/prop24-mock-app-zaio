import React from 'react';
import { Router, Scene, Actions}  from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import  PropertyListing from './components/PropertyListing';
import CreateProperty from './components/CreateProperty';
import EditProperty from './components/EditProperty';
import PropertyImageCapturer from './components/PropertyImageCapturer';
import {BLUE_DARK} from './components/common';
const RouterComponent = () => (
<Router>
    <Scene key='root' hideNavBar >
        <Scene 
        key='auth'
        hideNavBar
        >
            <Scene
            key='login'
            component={ LoginForm }
            hideNavBar
            initial
            />
            <Scene
            key='signUp'
            component={ SignUpForm }
            hideNavBar
            />
        </Scene>
        <Scene
        key='main'
        >
            <Scene
            key='propertyListing'
            component={PropertyListing}
            hideNavBar
            initial
            />
            <Scene 
            key='createProperty'
            component={CreateProperty}
            title='Create a Listing'
            titleStyle={{
                fontFamily:'sans-serif-condensed',
                color: '#fff'
            }}
            navigationBarStyle={{ backgroundColor: BLUE_DARK}}
            />
            <Scene 
            key='editProperty'
            component={EditProperty}
            title='Edit Property'
            titleStyle={{
                fontFamily:'sans-serif-condensed',
                color: '#fff'
            }}
            navigationBarStyle={{ backgroundColor: BLUE_DARK}}
            />
            <Scene 
            key='propertyImageCapturer'
            component={PropertyImageCapturer}
            hideNavBar
            />
        </Scene>
    </Scene>
</Router>
);
export default RouterComponent;