import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView
} from 'react-native';

export class HomeScreen extends Component {
  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>Log a headache to get started</Text>
          <Image source={require('../images/chart.png')} style={styles.graph} />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title='LOG A HEADACHE'
            color='#fff'
            onPress={() => { navigate('Add') }}
          />
        </View>
      </View>
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
    backgroundColor: '#2980b9',
    paddingVertical: 5,
    height: 50
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 20
  },
  graph: {
    height: 125,
    width: 300
  }
});
