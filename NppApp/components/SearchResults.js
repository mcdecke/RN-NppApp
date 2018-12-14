import React, {Component} from 'react'
import {
  Text,
  Animated,
  View,
  ScrollView,
  Image,
  ImageBackground,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native'
import {Button, Card} from 'react-native-elements'


const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class SearchResults extends Component {

state = {
  filteredPosters: [],
  search: ''
}

renderPosters

onSearch() {

  let filteredPosters = []
  const search = this.props.search
  // this.state.filteredPosters = []

  const posters = this.props.posters
  console.log(search);


if(posters[0].name !== undefined){
    for (let i = 0; i < posters.length; i++) {


      let stateAns = posters[i].state || ''
      let nameAns = posters[i].name || ''

        if(!!stateAns.match(search) || !!nameAns.match(search)){

        filteredPosters.push({
            name: posters[i].name,
            url: posters[i].url,
            text: posters[i].text,
            shop: posters[i].shop,
            state: posters[i].state
          })
          console.log(filteredPosters);
        }
    }
  console.log(filteredPosters)

    return filteredPosters.map(poster =>
      <View
      key={poster.name}>
        <Text>{poster.name}</Text>
      </View>
     )
  }
  else {
    return (
        <Text>Loading!!!</Text>
    )
  }
}


  render(){
    return(
      <Animated.View style={[styles.cardStyle]}>
        <ScrollView>{this.onSearch()}</ScrollView>
      </Animated.View>
    )
  }
}

const styles={
  cardStyle: {
    // flex: 1,
    // width: SCREEN_WIDTH + 42,
    marginLeft: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignText: 'center',
  }
}

export default SearchResults
