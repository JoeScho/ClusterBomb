import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  AsyncStorage,
  ListView,
  RefreshControl
} from 'react-native';

export class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      headaches: 'helloworld'
    }
  }

  componentDidMount () {
    this._refresh();
  }

  _refresh () {
    AsyncStorage.getAllKeys((_err, keys) => {
      if (keys) {
        AsyncStorage.multiGet(keys, (__err, data) => {
          this.setState({ 'headaches': data });
        });
      } else {
        this.setState({ 'headaches': 'No data' });
      }
    });
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>
            Headaches:
            {this.state.headaches
              ? this.state.headaches
              : 'Log a headache to get started'}
          </Text>
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
    padding: 20
  },
  graph: {
    height: 125,
    width: 300
  }
});
