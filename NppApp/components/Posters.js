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
import Poster from './Poster'
import Footer from './Footer'
import axios from 'axios'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Posters extends Component {

  // state = {
  //   posters: [],
  //   allPosters: [],
  //   index: 0
  // }
  //
  // loadPoster(){
  //   console.log(this.props.posters);
  // }



      static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
      }

      constructor(props){
          super(props)

          this.handler = this.handler.bind(this)

          const position = new Animated.ValueXY()
          const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
              position.setValue({x: gesture.dx, y: 0})
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
          console.log(this.props.posters);
          this.state = { panResponder, position, index: 0, filteredPosters: this.props.posters}
          console.log(this.state.index);
      }

      handler(posters){
        // console.log(posters);

        this.setState({
          filteredPosters: posters
        })
      }

      componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.easeInEaseOut()
      }

      resetPosition(){
        Animated.decay(
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
        const { onSwipeLeft, onSwipeRight, posters } = this.props
        const item = posters[this.state.index]
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
        console.log(direction == 'right');
        this.state.position.setValue({ x: 0, y: 0})
        if(direction == 'left'){
          if(this.state.index + 1 >= this.state.filteredPosters.length) {
            this.setState({index: 0})
          } else {
          this.setState({index: this.state.index + 1})
          }
        }
        else if (direction == 'right'){
          if((this.state.index - 1) < 0) {
            this.setState({index: this.state.filteredPosters.length - 1})
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

  render(){
    return (
    <View>
      <Animated.View style={[this.getCardStyle(), styles.posterStyle, {elevation: 1}]}
        {...this.state.panResponder.panHandlers}
      >
        <Poster
          poster={this.state.filteredPosters[this.state.index]}
        />
        <Footer
        action={this.handler}
        index={this.state.index}
        poster={this.state.filteredPosters}
        allPosters={this.props.posters}
        />
      </Animated.View>

      </View>
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
