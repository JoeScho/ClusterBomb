import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  AsyncStorage
} from 'react-native';

export class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      refreshing: false
    }
  }

  componentWillMount () {
    this._refresh();
  }

  _refresh () {
    this.setState({ refreshing: true });
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (__err, data) => {
        const headaches = [];
        data.forEach((headache) => {
          headaches.push(JSON.parse(headache[1]));
        });
        this.setState({ headaches });
        this.setState({ refreshing: false });
      });
    });
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Welcome to ClusterBomb!</Text>
          <Text style={styles.text}>Keep track of your headaches</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='LOG A HEADACHE'
              color='#fff'
              onPress={() => { navigate('Add', { refresh: this._refresh.bind(this) }) }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='VIEW CALENDAR'
              color='#fff'
              onPress={() => { navigate('Calendar') }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='VIEW CHART'
              color='#fff'
              onPress={() => { navigate('Chart') }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='SETTINGS'
              color='#fff'
              onPress={() => {
                navigate('Settings', { refresh: this._refresh.bind(this) })
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='VIEW MAP'
              color='#fff'
              onPress={() => {
                if (this.state.headaches.length > 0) {
                  navigate('Map', { headaches: this.state.headaches })
                } else {
                  alert('You must log a headache first')
                }
              }}
            />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#3498db',
    alignItems: 'center'
  },
  buttonContainer: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    height: 70
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#2980b9',
    paddingVertical: 5,
    height: 50
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  },
  textContainer: {
    padding: 20
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  }
});

