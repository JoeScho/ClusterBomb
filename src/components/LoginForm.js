import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  StatusBar,
  Alert
} from 'react-native';

export default class Login extends Component {
  render () {
    // const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <TextInput
          style={styles.input}
          placeholder='email'
          placeholderTextColor='rgba(255,255,255,0.9)'
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
        />
        <TextInput
          style={styles.input}
          placeholder='password'
          placeholderTextColor='rgba(255,255,255,0.9)'
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='go'
          ref={(input) => this.passwordInput = input}
          onSubmitEditing={() => this.loginButton}
        />
        <View style={styles.buttonContainer}>
          <Button
            title='LOGIN'
            color='#fff'
            ref={(pwd) => this.loginButton = pwd}
            onPress={() => { Alert.alert('Incorrect email or password') }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 5,
    height: 50
  }
}
