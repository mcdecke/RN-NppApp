import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  Alert,
  Animated,
  TextInput
} from 'react-native';
import {Icon, Button, Card} from 'react-native-elements'
import SearchResults from './SearchResults'

const SCREEN_WIDTH = Dimensions.get('window').width

class Footer extends Component {

  state = {
    infoVisible: false,
    searchVisible: false,
    text: 'Yellowstone'
  }

  onSearch() {

    let filteredPosters = []
    const search = this.state.text
    // this.state.filteredPosters = []

    const posters = this.props.posters
    console.log(search);


  if(posters[0].name !== undefined){
      for (let i = 0; i < posters.length; i++) {

        let stateAns = posters[i].state || ''
        let nameAns = posters[i].name || ''

          if(!!stateAns.match(search) || !!nameAns.match(search)){

          filteredPosters.push({
              name: posters[i].name,
              url: posters[i].url,
              text: posters[i].text,
              shop: posters[i].shop,
              state: posters[i].state
            })
            console.log(filteredPosters);
          }
      }
    console.log(filteredPosters)
    return filteredPosters
    }
  }


  setInfoVisible(visible) {

    this.setState({infoVisible: visible});
  }

  setSearchVisible(visible) {
    this.setState({searchVisible: visible});
  }

  renderFooter(){
    const { posters, index } = this.props

    let park = this.props.posters[this.props.index]
        console.log(this.props);

    if(posters[index] === undefined){
      return(
        <Text>Loading!!!</Text>
      )
    } else {
      return (

      <View style={styles.footerStyle}>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.searchVisible}
            onRequestClose={() => {
              this.setSearchVisible(false);
            }}
            >
            <View style={{marginTop: 32}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setSearchVisible(false);
                  }}>

                  <Button
                    style={styles.buttonStyle}
                    onPress={() => {
                      this.props.action(this.onSearch())
                      this.setSearchVisible(false);
                    }}>
                    <Text>Hide search</Text>
                  </Button>

                </TouchableHighlight>

                <View>
                  <Text>Search</Text>
                  <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                  />
                </View>
                <SearchResults
                  style={{flex: 1}}
                  search={this.state.text}
                  posters={this.props.posters}
                />
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.infoVisible}
            onRequestClose={() => {
              this.setInfoVisible(false);
            }}
            >
            <View style={{marginTop: 32}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setInfoVisible(false);
                  }}>

                  <Button onPress={() => {

                    this.setInfoVisible(false);
                  }}><Text>Hide info</Text></Button>

                </TouchableHighlight>
                <Text>{posters[index].name}</Text>
                <Text>{posters[index].text}</Text>
            </View>
          </Modal>

        <Icon
          raised
          style={styles.iconStyle}
          name='search'
          type='font-awesome'
          color='#f50'
          onPress={() => this.setSearchVisible(true)}
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
          onPress={() => this.setInfoVisible(true)}
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
  },
  buttonStyle: {
    borderRadius: 2,
  }
}

export default Footer
