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
import {Button, Card, Divider} from 'react-native-elements'
import Footer from './Footer'


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = SCREEN_HEIGHT * (620/906)
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
  // console.log(posters);


if(posters[0].name !== undefined){
    for (let i = 0; i < posters.length; i++) {


      let stateAns = posters[i].state || ''
      let nameAns = posters[i].name || ''

        if(!!stateAns.match(search) || !!nameAns.match(search)){

        filteredPosters.push({
            name: posters[i].name.trim(),
            url: posters[i].url,
            text: posters[i].text,
            shop: posters[i].shop,
            state: posters[i].state
          })
          // console.log(filteredPosters);
        }
    }
  // console.log(filteredPosters)


    return filteredPosters.map(poster =>
      <View

      style={[styles.cardStyle]}
      key={poster.name}>
        <Text

        onPress={() => {
          console.log(poster.name);
          //push filtered list
          // this.props.action(this.onSearch())
          //filter selected poster
          this.props.action(poster.name)
        }}

        >{poster.name}</Text>
        <Divider style={{
          justifyContent: 'center',
          margin: 6
        }}/>
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
    marginLeft: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignText: 'center',
  }
}

export default SearchResults
