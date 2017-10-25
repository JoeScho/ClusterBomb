import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export class HeadacheScreen extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={this.props.navigation.state.params.headaches}
            renderItem={({ item }) =>
              <View style={styles.listContainer}>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    navigate('Map', { headaches: [item] })
                  }}>
                  <Text style={styles.heading}>{item.Time} on {item.Date}</Text>
                  <Text style={styles.mainText}>
                    Lasted {item.Duration} minutes{'\n'}
                    Was a {item.PainLevel}/10 pain level{'\n'}
                    You used {item.Medication !== 'none'
                      ? `${item.Medication} which took ${item.TimeToWork} minutes to relieve symptoms \n`
                      : 'no medication\n'}
                    {item.Trigger !== 'none'
                      ? `May have been triggered by ${item.Trigger}`
                      : 'No known trigger'}
                  </Text>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={item => item.Time}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center'
  },
  listContainer: {
    padding: 10,
    alignSelf: 'stretch',
  },
  listItem: {
    alignSelf: 'stretch',
    height: 130,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff'
  },
  mainText: {
    color: '#fff'
  }
});
