import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/components/Login.js';
import Home from './src/components/Home.js';

const App = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home }
});


export default class ClusterBomb extends Component {
  render () {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent('ClusterBomb', () => ClusterBomb);
