import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import {Icon, Button, Card} from 'react-native-elements'


const SCREEN_WIDTH = Dimensions.get('window').width

class Footer extends Component {

  state = {
    modalVisible: false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    return (
    <View style={styles.footerStyle}>
    
    <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

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
        onPress={() => this.setModalVisible(true)}
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
