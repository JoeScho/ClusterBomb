import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'

import { SplashScreen } from './src/components/Splash.js';
import { HomeScreen } from './src/components/Home.js';
import { AddScreen } from './src/components/Add.js';
import { SettingsScreen } from './src/components/Settings.js';

export default class MainScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const navigation = this.props.navigation;

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    })

    setTimeout(nav, 2000);

    function nav () {
      navigation.dispatch(resetAction)
    }
  }

  render () {
    return (
      <SplashScreen />
    );
  }
}

export const ClusterBomb = StackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: false
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'ClusterBomb'
    }
  },
  Add: {
    screen: AddScreen,
    navigationOptions: {
      headerTitle: 'Log a Headache'
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      headerTitle: 'Settings'
    }
  }
});

AppRegistry.registerComponent('ClusterBomb', () => ClusterBomb);