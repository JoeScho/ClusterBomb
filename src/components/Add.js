import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Button
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Slider from 'react-native-slider';
import { NavigationActions } from 'react-navigation'

export class AddScreen extends Component {
  constructor() {
    super();

    this.state = {
      value: 0
    };
  };
  static navigationOptions = {
    title: 'Log a Headache'
  };

  render () {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position" style={styles.container}>
          <Text style={styles.text}>Date:</Text>
          <View style={styles.centered}>
            <DatePicker
              style={styles.picker}
              date={this.state.date}
              mode="date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => { this.setState({ date }) }}
            />
          </View>
          <Text style={styles.text}>Time:</Text>
          <View style={styles.centered}>
            <DatePicker
              style={styles.picker}
              date={this.state.time}
              format="HH:mm"
              minuteInterval={10}
              mode="time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(time) => { this.setState({ time }) }}
            />
          </View>
          <Text style={styles.text}>Duration: {this.state.duration} minutes</Text>
          <View style={styles.centered}>
            <Slider
              style={styles.slider}
              value={0}
              minimumValue={0}
              maximumValue={200}
              step={5}
              onValueChange={(value) => { this.setState({ duration: value }) }} />
          </View>
          <Text style={styles.text}>Pain Level: {this.state.painLevel}</Text>
          <View style={styles.centered}>
            <Slider
              style={styles.slider}
              value={0}
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={(value) => { this.setState({ painLevel: value }) }} />
          </View>
          <Text style={styles.text}>Medication Used:</Text>
          <View style={styles.centered}>
            <TextInput
              style={styles.input}
              placeholder='i.e. Sumatriptan Injection' />
          </View>
          <Text style={styles.text}>Time to Take Effect: {this.state.medTime} minutes</Text>
          <View style={styles.centered}>
            <Slider
              style={styles.slider}
              value={0}
              minimumValue={0}
              maximumValue={120}
              step={5}
              onValueChange={(value) => { this.setState({ medTime: value }) }} />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Button
            title='SAVE'
            color='#fff'
            onPress={() => {
              save();
              this.props.navigation.dispatch(NavigationActions.back());
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3498db',
    flex: 1,
    paddingHorizontal: 10
  },
  centered: {
    alignItems: 'center'
  },
  text: {
    fontWeight: '700',
    color: '#fff',
    paddingVertical: 15
  },
  slider: {
    alignSelf: 'stretch'
  },
  picker: {
    width: 300,
    backgroundColor: '#fff'
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
    color: '#555',
    paddingHorizontal: 10
  },
  buttonContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#2980b9',
    paddingVertical: 5,
    height: 50
  },
});
