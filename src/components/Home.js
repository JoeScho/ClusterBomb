import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import { Calendar } from 'react-native-calendars';
// import Chart from 'react-native-chart';

export class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      refreshing: false
    }
  }

  componentDidMount () {
    this._refresh();
  }

  _refresh () {
    this.setState({ refreshing: true });
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (__err, data) => {
        const headaches = [];
        data.forEach((headache) => {
          headaches.push(JSON.parse(headache[1]))
        })
        this.setState({ refreshing: false });
        this.setState({ headaches });
        this._setMarkedDates();
      });
    });
  }

  _setMarkedDates () {
    const markedDates = {};

    this.state.headaches.forEach((headache) => {
      markedDates[headache.Date] = { selected: true, marked: true }
    });

    this.setState({ markedDates });
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title='LOG A HEADACHE'
            color='#fff'
            onPress={() => { navigate('Add', { refresh: this._refresh.bind(this) }) }}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this._refresh.bind(this)}
              refreshing={this.state.refreshing}
            />
          }>
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
              markedDates={this.state.markedDates}
              onDayPress={(day) => {
                navigate('Add', { refresh: this._refresh.bind(this), date: day.dateString })
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title='SETTINGS'
            color='#fff'
            onPress={() => {
              navigate('Settings', { refresh: this._refresh.bind(this) })
            }}
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
    color: '#fff',
    padding: 20
  },
  calendar: {
    width: 300
  },
  calendarContainer: {
    padding: 10
  }
});

