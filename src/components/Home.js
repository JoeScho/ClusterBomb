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
import { Bar } from 'react-native-pathjs-charts';
import chartOpts from '../js/barChartOpts';
import getChartData from '../js/barChartData';

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
        this.setState({ chartData: getChartData(headaches) });
        this.setState({ chartOpts: chartOpts(headaches.length) });
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
        <View style={styles.buttonContainer}>
          <Button
            title='LOG A HEADACHE'
            color='#fff'
            onPress={() => { navigate('Add', { refresh: this._refresh.bind(this) }) }}
          />
        </View>
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
            <Text style={styles.heading}>
              Welcome to ClusterBomb!
            </Text>
            <Text style={styles.text}>
              Keep track of your headaches
            </Text>
            <Bar
              data={this.state.chartData}
              options={this.state.chartOpts}
              accessorKey='count'
            />
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
    textAlign: 'center'
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  calendar: {
    width: 300
  },
  innerContainer: {
    padding: 10
  },
  chart: {
    width: 200,
    height: 200,
  }
});

