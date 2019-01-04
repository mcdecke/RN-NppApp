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
import {Icon, Button, Card, Divider} from 'react-native-elements'
import SearchResults from './SearchResults'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = SCREEN_HEIGHT * (620/906)

class Footer extends Component {



  constructor(props, context){
      super(props, context)
      // console.log(props);

      this.hider = this.hider.bind(this)

      this.state = {
        infoVisible: false,
        searchVisible: false,
        text: ''
      }

    }


  hider(visible){
    console.log(visible);
    this.setState({searchVisible: visible});
  }

  onSearch() {


    let filteredPosters = []
    let search = this.state.text
    const posters = this.props.posters

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
          }
      }
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
                <View style={[styles.cardStyle]}>
                  <Text>Search by State or Park: </Text>
                  <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,
                    borderRadius: 3,
                    marginLeft: 4,
                    padding: 4
                  }}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                  />

                </View>
                <TouchableHighlight>
                  <SearchResults
                    hider={this.hider}
                    action={this.props.action}
                    style={{flex: 1}}
                    search={this.state.text}
                    posters={this.props.posters}
                  />
                </TouchableHighlight>
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

              <Card style={styles.cardStyle}>
                <Text style={[
                  {textAlign: 'center'},
                  {lineHeight: 30},
                  {fontWeight: 'bold'}
                 ]}>{posters[index].name}</Text>
                <Divider />
                <Text
                  style={[
                    {textAlign: 'left'},
                    {lineHeight: 20},
                    {marginTop: 10}
                   ]}
                >{posters[index].text}</Text>
              </Card>
              <TouchableHighlight

                  onPress={() => {
                    this.setInfoVisible(false);
                  }}>

                  <View style={styles.cardStyle}
                    onPress={() => {
                      this.setInfoVisible(false);
                    }}>
                    <Text style={styles.hideStyle}>Hide info</Text>
                  </View>

              </TouchableHighlight>
            </View>
          </Modal>

        <Icon
          raised
          style={styles.iconStyle}
          name='search'
          type='font-awesome'
          color='#f50'
          onPress={() => {
            this.setSearchVisible(true)

          }}
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
    marginTop: -16,
    marginLeft: -72,
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
  cardStyle: {
    justifyContent: 'center',
    margin: 6,
    textAlign: 'center',
    lineHeight: 300
  },
  hideStyle: {
    // width: SCREEN_WIDTH/5,
    margin: 6,
    marginLeft: SCREEN_WIDTH/3,
    marginRight: SCREEN_WIDTH/3,
    borderWidth: 1,
    borderColor: 'tomato',
    borderRadius: 3,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'tomato'
  }
}

export default Footer
