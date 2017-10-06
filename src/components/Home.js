import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Navigator
} from 'react-native';
import LoginForm from './LoginForm.js';

export default class Login extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Welcome to the home page</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  }
}
