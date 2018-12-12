import React, {Component} from 'react'
import {
  Text,
  Animated,
  View,
  Image,
  ImageBackground,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
 } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class Poster extends Component {

  constructor(props){
      super(props)

      const position = new Animated.ValueXY()
      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          position.setValue({x: gesture.dx, y: gesture.dy})
        },
        onPanResponderRelease: (event, gesture) => {

          if(gesture.dx > SWIPE_THRESHOLD){
            this.forceSwipe('right')
          }
          else if(gesture.dx < -SWIPE_THRESHOLD){
            this.forceSwipe('left')
          } else {
            this.resetPosition()
          }
        }
      })
      console.log(this.props.data);

      // {name, shop, state, url, text } = this.props.data

      this.state = { panResponder, position, index: 0}
    }


    renderPoster(){
      console.log(this.props.data);
      let park = this.props.data
      if(park === undefined){
        return(
          <Text>Loading!!!</Text>
        )
      } else {
        return (
        <View style={{
          flex: 1,
          alignSelf: 'stretch'
        }}>
          <Image
          source={{uri: park.url}}
          style={[styles.posterStyle]}
          >
          </Image>
        </View>
        )
      }
    }


  render(){
    return(
      <View>
        {this.renderPoster()}
      </View>
    )
  }

}

const styles={
  posterStyle: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    width: SCREEN_WIDTH + 32,
    height: SCREEN_HEIGHT,
    marginLeft: -16,

  }
}

export default Poster
