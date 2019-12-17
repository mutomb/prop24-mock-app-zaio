import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, AppLogo }  from './src/components/common';
class App extends Component {
  render() {
    return(
      <Header>
        <AppLogo />
      </Header>
    );
  }
}
export default App;