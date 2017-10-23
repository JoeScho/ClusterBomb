import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { SplashScreen } from './src/components/Splash.js';
import { HomeScreen } from './src/components/Home.js';
import { AddScreen } from './src/components/Add.js';
import { SettingsScreen } from './src/components/Settings.js';

export default class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      component: <SplashScreen />
    }
  }
  static navigationOptions = {
    title: 'ClusterBomb'
  };

  componentDidMount () {
    this.timeoutHandle = setTimeout(() => {
      this.setState(
        { component: <HomeScreen navigation={this.props.navigation} /> }
      )
    }, 2000);
  }

  componentWillUnmount () {
    clearTimeout(this.timeoutHandle);
  }

  render () {
    return (
      this.state.component
    );
  }
}

export const ClusterBomb = StackNavigator({
  Main: { screen: MainScreen },
  Home: { screen: HomeScreen },
  Add: { screen: AddScreen },
  Settings: { screen: SettingsScreen }
});

AppRegistry.registerComponent('ClusterBomb', () => ClusterBomb);