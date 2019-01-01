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
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Poster extends Component {

  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props){
      super(props)

      const position = new Animated.ValueXY()
      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          position.setValue({x: gesture.dx})
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
      this.state = { panResponder, position, index: 0}
    }

  componentWillReceiveProps(nextProps){
      console.log(this.props);
    if(nextProps.data !== this.props.data) {
      this.setState({index: 0})
    }
  }

  componentWillUpdate(){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring()
  }

  resetPosition(){
    Animated.spring(
      this.state.position, {toValue: {x: 0, y: 0}}
    ).start()
  }

  forceSwipe(direction){
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(this.state.position, {
      toValue: { x: 1.2*x, y: 0},
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction))
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, poster } = this.props
    const item = poster[this.state.index]
    console.log(this.props.poster);
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    this.state.position.setValue({ x: 0, y: 0})
    this.setState({index: this.state.index + 1})
  }

  getCardStyle() {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-0deg', '0deg', '0deg']
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

    renderPoster(){
      // console.log(this.props.posters);
      let park = this.props.poster
      // console.log(this.park);
      if(park == undefined){
        return(
          <Text>Loading!!!</Text>
        )
      } else {
        return (
        <Animated.View
          style={[this.getCardStyle(),
            styles.cardStyle,
            {elevation: 1}]}
          {...this.state.panResponder.panHandlers}
        >
          <Card >
            <Image
            source={{uri: park.url}}
            style={[styles.posterStyle]}
            >
            </Image>
            <Footer/>
          </Card>
        </Animated.View>
        )
      }
    }


  render(){
    return(
      <Animated.View style={styles.cardStyle}>
        {this.renderPoster()}
      </Animated.View>
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
    marginLeft: -16,
  }
}

export default Poster
