import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  AsyncStorage,
  Alert
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Slider from 'react-native-slider';
import { NavigationActions } from 'react-navigation'

export class AddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.navigation.state.params.date || buildDate(),
      time: buildTime(),
      duration: 30,
      painLevel: 5,
      medication: 'None',
      medTime: 15
    };
  };
  static navigationOptions = {
    title: 'Log a Headache'
  };

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.outerContainer}>
        <ScrollView>
          <KeyboardAvoidingView behavior="position" style={styles.container}>
            <Text style={styles.text}>Date:</Text>
            <View style={styles.centered}>
              <DatePicker
                style={styles.picker}
                date={this.state.date}
                mode="date"
                format="YYYY-MM-DD"
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
                value={this.state.duration}
                minimumValue={0}
                maximumValue={200}
                step={5}
                onValueChange={(value) => { this.setState({ duration: value }) }} />
            </View>
            <Text style={styles.text}>Pain Level: {this.state.painLevel}</Text>
            <View style={styles.centered}>
              <Slider
                style={styles.slider}
                value={this.state.painLevel}
                minimumValue={0}
                maximumValue={10}
                step={1}
                onValueChange={(value) => { this.setState({ painLevel: value }) }} />
            </View>
            <Text style={styles.text}>Medication Used:</Text>
            <View style={styles.centered}>
              <TextInput
                style={styles.input}
                placeholder='i.e. Sumatriptan Injection'
                onChangeText={(medication) => { this.setState({ medication }) }} />
            </View>
            <Text style={styles.text}>Time to Take Effect: {this.state.medTime} minutes</Text>
            <View style={styles.centered}>
              <Slider
                style={styles.slider}
                value={this.state.medTime}
                minimumValue={0}
                maximumValue={120}
                step={5}
                onValueChange={(value) => { this.setState({ medTime: value }) }} />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title='SAVE'
            color='#fff'
            onPress={() => {
              save(this.state, () => { Alert.alert('Saved') });
              this.props.navigation.state.params.refresh();
              this.props.navigation.dispatch(NavigationActions.back());
            }}
          />
        </View>
      </View>
    );
  }
}

function save (state, cb) {
  const headache = {
    Date: state.date,
    Time: state.time,
    Duration: state.duration,
    PainLevel: state.painLevel,
    Medication: state.medication,
    TimeToWork: state.medTime,
    Month: state.date.split('-')[1].split('-')[0] - 1
  };

  AsyncStorage.setItem(`${headache.Date}T${headache.Time}`, JSON.stringify(headache), cb);
}

function buildDate () {
  const today = new Date();

  const dd = today.getDate();
  const mm = today.getMonth() + 1 < 10
    ? `0${today.getMonth() + 1}`
    : today.getMonth() + 1;

  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

function buildTime () {
  const today = new Date();

  const HH = today.getHours();
  const mm = today.getMinutes();

  return `${HH}:${mm}`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3498db',
    flex: 1,
    paddingHorizontal: 10,
  },
  outerContainer: {
    backgroundColor: '#3498db',
    flex: 1
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
