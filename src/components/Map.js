import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';

export class MapScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount () {
    const headaches = this.props.navigation.state.params.headaches;
    this.setState({
      markers: headaches.map((headache) => {
        return {
          latlng: {
            latitude: headache.Latitude,
            longitude: headache.Longitude
          },
          title: `${headache.Time} on ${headache.Date}`
        }
      })
    });
  }

  render () {
    const { navigate } = this.props.navigation;
    const headaches = this.props.navigation.state.params.headaches;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.markers[0].latlng.latitude,
            longitude: this.state.markers[0].latlng.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              key={marker.title}
              title={marker.title}
            />
          ))}
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#3498db',
    alignItems: 'center'
  },
  map: {
    alignSelf: 'stretch',
    flex: 2
  },
  list: {
    flex: 1
  }
});
