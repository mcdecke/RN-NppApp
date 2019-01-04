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

 import SearchResults from './SearchResults'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Poster extends Component {

  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props, context){
      super(props, context)
      this.handler = this.handler.bind(this)

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

      this.renderPoster = this.renderPoster.bind(this)

      this.state = { panResponder, position, index: 0, hidden: true}
    }

  componentWillReceiveProps(nextProps){

    if(nextProps.poster !== this.props.poster) {
      this.setState({index: 0})
    }
  }

  handler(i){
    for (let j = 0; j < this.props.posters.length; j++) {
      if (i == this.props.posters[j].name) {
        console.log(i);
        this.setState({
          index: j
        })
      }
    }
    this.setState({ hidden: true })
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
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    console.log(this.props.posters.length);
    this.state.position.setValue({ x: 0, y: 0})
    if(direction == 'left'){
      if (this.state.index >= this.props.posters.length - 1) {
        this.setState({index: 0})
      } else {
        this.setState({index: this.state.index + 1})
      }
    }
    else{
      if (this.state.index <= 0) {
        this.setState({index: this.props.posters.length - 1})
      } else {
      this.setState({index: this.state.index - 1})
    }
  }
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

      let park = this.props.posters

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
            source={{uri: park[this.state.index].url}}
            style={[styles.posterStyle]}
            >
            </Image>
            <Footer
              action={this.handler}
              posters={this.props.posters}
              index={this.state.index}
            />
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
    // marginLeft: -32,
    marginBottom: 0,
    marginTop: -16,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 68,

  },
  cardStyle: {
    width: SCREEN_WIDTH + 42,
    // marginLeft: -32,
  }
}

export default Poster
