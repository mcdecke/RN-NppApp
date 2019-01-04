import React from 'react';
import { StyleSheet, Text, View, Animated, LayoutAnimation, UIManager } from 'react-native';
import Footer from './components/Footer'
import Poster from './components/Poster'
import Posters from './components/Posters'
import axios from 'axios'

export default class App extends React.Component {

filteredPosters = []

state = {
  index: 0
}

componentWillUpdate(){
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
  LayoutAnimation.spring()
}

  componentWillMount(){
    axios.get('https://national-park-posters-app.firebaseio.com/data.json')
    .then(response => {
      const posters = response.data
      for (let key in posters) {
          for (let i = 0; i < posters[key].length; i++) {
            if (posters[key][i] !== null) {
              this.filteredPosters.push({
                name: posters[key][i].name,
                url: posters[key][i].url,
                text: posters[key][i].text,
                shop: posters[key][i].shop,
                state: posters[key][i].state
              })
            }
          }
        }
        this.setState({
            posters: this.filteredPosters,
            poster: this.filteredPosters[0]
          })
    })
  }

  render() {
    return (
      <Animated.View style={styles.container}>
        <Poster
          posters={this.state.posters}
          poster={this.state.poster}
        />
      </Animated.View>
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
