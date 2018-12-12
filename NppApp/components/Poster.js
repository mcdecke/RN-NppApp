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
 import {Button, Card} from 'react-native-elements'
 import Footer from './Footer'

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
      // console.log(this.props.data);

      // {name, shop, state, url, text } = this.props.data

      this.state = { panResponder, position, index: 0}
    }


    renderPoster(){
      console.log(this.props.posters);
      let park = this.props.posters
      // console.log(this.park);
      if(park == undefined){
        return(
          <Text>Loading!!!</Text>
        )
      } else {
        return (

        <Card >
          <Image
          source={{uri: park.url}}
          style={[styles.posterStyle]}
          >
          </Image>
          <Footer/>
        </Card>
        )
      }
    }


  render(){
    return(
      <View style={styles.cardStyle}>
        {this.renderPoster()}
      </View>
    )
  }

}

const styles={
  posterStyle: {
    // flex: 1,
    resizeMode: 'stretch',
    margin: -32,
    marginLeft: -16,
    marginBottom: 0,
    marginTop: -16,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 68,

  },
  cardStyle: {
    width: SCREEN_WIDTH + 42,
    // marginTop: 16,
    marginLeft: -16,
    // marginRight: -16,
    // shadowOpacity: 0,
    // border: 0,
    // borderRadius: 0,
    // shadowRadius: 10,
    // flex: 1,
    // elevation: 0
    // // position: 'absolute',
    // // resizeMode: 'stretch',
  }
}

export default Poster
