import React, {Component} from 'react'
import {
  Text,
  Animated,
  View,
  Dimensions
 } from 'react-native'
import Poster from './Poster'
import Footer from './Footer'
import axios from 'axios'


 const SCREEN_WIDTH = Dimensions.get('window').width

class Posters extends Component {

  state = {
    posters: [],
    allPosters: [],
    index: 0
  }

  loadPoster(){
    console.log(this.props.posters);
  }

  render(){
    return (
      <Animated.View style={styles.posterStyle}>
        {this.loadPoster()}
        <Footer />
      </Animated.View>
    )
  }
}


const styles={
  posterStyle: {
    flex: 1,
    position: 'absolute'
  }
}

export default Posters
