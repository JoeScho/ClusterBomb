import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export class SplashScreen extends Component {
  render () {
    return (
      <View behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/logo.png')}
          />
          <Text style={styles.title}>ClusterBomb</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    height: 150,
    width: 100
  },
  title: {
    color: '#000',
    marginTop: 10,
    fontWeight: '700',
    fontSize: 30,
    width: 200,
    textAlign: 'center',
    opacity: 0.9
  },
  progress: {
    height: 50
  }
});