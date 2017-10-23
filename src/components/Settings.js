import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  AsyncStorage,
  View,
  Button,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render () {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title='DELETE ALL DATA'
            color='#fff'
            onPress={() => {
              Alert.alert(
                'DELETE ALL DATA',
                'Are you sure you wish to delete ALL of your ClusterBomb data?',
                [
                  { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                  {
                    text: 'Yes', onPress: () => {
                      AsyncStorage.clear(() => {
                        Alert.alert('All data deleted');
                        this.props.navigation.state.params.refresh();
                        this.props.navigation.dispatch(NavigationActions.back());
                      })
                    }
                  },
                ],
                { cancelable: false }
              )
              AsyncStorage
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center'
  },
  buttonContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#2980b9',
    paddingVertical: 5,
    height: 50
  },
});
