import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './components/Footer'
import Posters from './components/Posters'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Posters />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
