import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Bar } from 'react-native-pathjs-charts';
import chartOpts from '../js/barChartOpts';
import getChartData from '../js/barChartData';

export class ChartScreen extends Component {
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
        this.setState({ refreshing: false });
      });
    });
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          This chart shows a count of all the headaches in each month of the past year.
        </Text>
        <Bar
          data={this.state.chartData}
          options={this.state.chartOpts}
          style={styles.chart}
          accessorKey='count'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    padding: 20
  },
  chart: {
    alignSelf: 'stretch'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 20
  }
});

