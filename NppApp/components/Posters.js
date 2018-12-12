import React, {Component} from 'react'
import {
  Text,
  Animated,
  View,
  Dimensions
 } from 'react-native'
import Poster from './Poster'
import axios from 'axios'


 const SCREEN_WIDTH = Dimensions.get('window').width

class Posters extends Component {

  state = {
    posters: [],
    allPosters: [],
    index: 0
  }

  allPosters = []

  componentWillMount(){
    axios.get('https://national-park-posters-app.firebaseio.com/data.json')
    .then(response => {
      const posters = response.data
      for (let key in posters) {
          for (let i = 0; i < posters[key].length; i++) {
            if (posters[key][i] !== null) {
              this.allPosters.push({
                name: posters[key][i].name,
                url: posters[key][i].url,
                text: posters[key][i].text,
                shop: posters[key][i].shop,
                state: posters[key][i].state
              })
            }
          }
        }
        this.setState({posters: this.allPosters})
        console.log(this.allPosters);
    })
  }


  loadPoster(){
  if (this.allPosters !== undefined) {
    console.log(this.state.posters);
      return (
        <Poster
          data={this.state.posters[this.state.index]}
        />
      )
  } else {
      return (
        <Text>Loading!</Text>
      )
    }
  }

  render(){
    return (
      <Animated.View style={styles.posterStyle}>
        {this.loadPoster()}
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
