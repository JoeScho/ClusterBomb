import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView
} from 'react-native';

export class AddScreen extends Component {
  render () {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/logo.png')}
          />
          <Text style={styles.title}>ClusterBomb</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
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
  }
}
