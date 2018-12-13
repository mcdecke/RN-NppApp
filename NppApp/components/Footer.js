import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {Icon, Button, Card} from 'react-native-elements'


const SCREEN_WIDTH = Dimensions.get('window').width

class Footer extends Component {
  render(){
    return (
    <View style={styles.footerStyle}>
      <Icon
        raised
        style={styles.iconStyle}
        name='search'
        type='font-awesome'
        color='#f50'
        onPress={() => console.log('hello')}
      />
      <Card style={styles.counterStyle}>
        <Text>{this.props.index + 1}/{this.props.posters.length}</Text>
      </Card>
      <Icon

        raised
        style={styles.iconStyle}
        name='info-circle'
        type='font-awesome'
        color='#f50'
        onPress={() => console.log('hello')}
      />

    </View>
    )
  }
}

const styles = {
  footerStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 32,
    marginTop: -32,
    marginLeft: 0,
    marginBottom: 0,
  },
  iconStyle: {
    flex: 1,
    margin: 36,
  },
  counterStyle: {
    flex: 1,
    margin: 36,
    width: 400,
  }
}

export default Footer
