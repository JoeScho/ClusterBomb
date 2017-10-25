import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'

import { SplashScreen } from './src/components/Splash.js';
import { HomeScreen } from './src/components/Home.js';
import { AddScreen } from './src/components/Add.js';
import { SettingsScreen } from './src/components/Settings.js';
import { HeadacheScreen } from './src/components/ViewHeadaches.js';
import { MapScreen } from './src/components/Map.js';
import { CalendarScreen } from './src/components/Calendar.js';
import { ChartScreen } from './src/components/Chart.js';

const styles = StyleSheet.create({
  image: {
    height: 35,
    width: 24
  }
});

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
      headerTitle: <Image
        source={require('./src/images/logo.png')}
        style={styles.image}
      />
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
  },
  ViewHeadaches: {
    screen: HeadacheScreen,
    navigationOptions: {
      headerTitle: 'View Headaches'
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      headerTitle: 'Map'
    }
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      headerTitle: 'Calendar'
    }
  },
  Chart: {
    screen: ChartScreen,
    navigationOptions: {
      headerTitle: 'Chart'
    }
  }
});

AppRegistry.registerComponent('ClusterBomb', () => ClusterBomb);