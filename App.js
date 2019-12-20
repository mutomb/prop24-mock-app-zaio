import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import Router from './src/Router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn: null,
      isSplashReady: false,
      isAppReady: false,
    }
    const firebaseConfig = {
      apiKey: "AIzaSyCGfNxm6Gq3hn_nVbvgrQu08NpzlK-Kzbg",
      authDomain: "property24-zaio.firebaseapp.com",
      databaseURL: "https://property24-zaio.firebaseio.com",
      projectId: "property24-zaio",
      storageBucket: "property24-zaio.appspot.com",
      messagingSenderId: "280579551772",
      appId: "1:280579551772:web:61fd4dce7ab6e690b0e5d9",
      measurementId: "G-C3RV1VVFF1"
    };
    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(user => { 
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  render() {
    const store = createStore(
      reducers,
      applyMiddleware(
        ReduxThunk, // lets us dispatch() functions
      )
    );
    return(
        <Provider store={store}>
          <Router />
        </Provider>
    );
  }
}  
export default App;