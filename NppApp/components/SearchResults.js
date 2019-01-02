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


const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class SearchResults extends Component {

state = {
  filteredPosters: [],
  search: ''
}


// onSearch() {
//
//   let filteredPosters = []
//   const search = this.props.search
//   // this.state.filteredPosters = []
//
//   const posters = this.props.allPosters
//   // console.log(posters);
//
//
// if(posters[0].name !== undefined){
//     for (let i = 0; i < posters.length; i++) {
//
//
//       let stateAns = posters[i].state || ''
//       let nameAns = posters[i].name || ''
//
//         if(!!stateAns.match(search) || !!nameAns.match(search)){
//
//         filteredPosters.push({
//             name: posters[i].name.trim(),
//             url: posters[i].url,
//             text: posters[i].text,
//             shop: posters[i].shop,
//             state: posters[i].state
//           })
//           // console.log(filteredPosters);
//         }
//     }
//   // console.log(filteredPosters)
//
//
//   if(this.props.poster !== null) {
//     poster = this.props.poster
//       console.log(poster);
//
//      }
//   }
//   else {
//     return (
//         <Text>Loading!!!</Text>
//     )
//   }
// }


  render(){
    return(
      <Animated.View style={[styles.cardStyle]}>
          <View
          style={[styles.cardStyle]}
          key={this.props.poster.name}>
            <Text>{this.props.poster.name}</Text>
            <Divider style={{
              justifyContent: 'center',
              margin: 6
            }}/>
          </View>
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
