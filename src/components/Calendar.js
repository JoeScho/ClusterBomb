import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  RefreshControl,
  Text
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export class CalendarScreen extends Component {
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
        this._setMarkedDates();
        this.setState({ refreshing: false });
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
        <Text style={styles.text}>
          This calendar shows all the headaches logged in a monthly view.{'\n\n'}
          Try clicking on a date!
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          centerContent={true}
          refreshControl={
            <RefreshControl
              onRefresh={this._refresh.bind(this)}
              refreshing={this.state.refreshing}
            />
          }>
          <View style={styles.innerContainer}>
            <Calendar
              style={styles.calendar}
              markedDates={this.state.markedDates}
              onDayPress={(day) => {
                if (this.state.markedDates[day.dateString]) {
                  return navigate('ViewHeadaches', {
                    headaches: this.state.headaches.filter((headache) => {
                      return headache.Date === day.dateString;
                    })
                  });
                }
                return navigate('Add', {
                  refresh: this._refresh.bind(this),
                  date: day.dateString
                });
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#3498db',
    alignItems: 'center',
    padding: 10
  },
  calendar: {
    width: 300
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    padding: 20,
    fontSize: 16
  }
});

