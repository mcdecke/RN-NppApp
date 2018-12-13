import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  Alert,
  Animated
} from 'react-native';
import {Icon, Button, Card} from 'react-native-elements'


const SCREEN_WIDTH = Dimensions.get('window').width

class Footer extends Component {

  state = {
    modalVisible: false
  }


  setModalVisible(visible) {
    console.log(visible);
    this.setState({modalVisible: visible});
  }

  renderFooter(){
    const { posters, index } = this.props

    let park = this.props.posters[this.props.index]
        console.log(park);

    if(posters[index] === undefined){
      return(
        <Text>Loading!!!</Text>
      )
    } else {
      return (
      <View style={styles.footerStyle}>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            >
            <View style={{marginTop: 32}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>

                  <Button onPress={() => {
                    this.setModalVisible(false);
                  }}>Hide Modal</Button>
                </TouchableHighlight>
                <Text>{posters[index].text}</Text>
            </View>
          </Modal>
        </View>
        <Icon
          raised
          style={styles.iconStyle}
          name='search'
          type='font-awesome'
          color='#f50'
          onPress={() => console.log('hello')}
        />
        <Card style={styles.counterStyle}>
          <Text>{index + 1}/{posters.length}</Text>
        </Card>
        <Icon
          raised
          style={styles.iconStyle}
          name='info-circle'
          type='font-awesome'
          color='#f50'
          onPress={() => this.setModalVisible(true)}
        />
      </View>
      )
    }
  }


  render(){
    return(
      <Animated.View>
        {this.renderFooter()}
      </Animated.View>
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
