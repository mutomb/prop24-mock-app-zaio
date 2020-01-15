import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import Router from './src/Router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      isSplashReady: false,
      isAppReady: false,
    };
    const firebaseConfig = {
     //firebase API config
    };
    if (!firebase.apps.length) {
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
    return (
        <Provider store={store}>
          <Router />
        </Provider>
    );
  }
}  
export default App;
