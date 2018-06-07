/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import {
  Icon,
  Rating,
  SearchBar
} from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1272;

class SpringView extends React.Component {
  state = {
    springValue: new Animated.Value(0.3),
  }

  componentDidMount() {
    Animated.spring(
      this.state.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start()
  }

  render() {
    let { springValue } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform: [{scale: this.state.springValue}]
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class App extends Component {
  greenViewLayout = (event) => {
    console.log('Total Screen: ', event.nativeEvent.layout.height);
  };

  blueViewLayout = (event) => {
    console.log('Searchbar Container: ', event.nativeEvent.layout.height);
  };

  redViewLayout = (event) => {
    console.log('Image Container: ', event.nativeEvent.layout.height);
  };

  searchChangeTextHandler = (text) => {
    console.log('searched text is: ', text);
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedBoxes: [{
        top: 10,
        left: 30,
        width: 64,
        height: 32
      }],
      placeInfo: {
        "geometry" : {
           "location" : {
              "lat" : 37.3215269,
              "lng" : -121.9718225
           },
           "viewport" : {
              "northeast" : {
                 "lat" : 37.3228009802915,
                 "lng" : -121.9703314197085
              },
              "southwest" : {
                 "lat" : 37.3201030197085,
                 "lng" : -121.9730293802915
              }
           }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        "id" : "8fe5b3d86b2e31887301dec3df4359439485c62d",
        "name" : "Naan & Curry",
        "opening_hours" : {
           "open_now" : false,
           "weekday_text" : []
        },
        "photos" : [
           {
              "height" : 3036,
              "html_attributions" : [
                 "\u003ca href=\"https://maps.google.com/maps/contrib/109322044954882859880/photos\"\u003eSuzanne Coberly\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAdcH2fs_9oUOsmqOxLzE79aMobzH0enDWIJImcwmHJThUbuOqnDUUkQMq6zj6N5XPTIrX4hoMbtkTvezbVh78cpvPcGtt-8h7dqd5gS4trODEPYtDM3fQ0xwjIZCpm5Y6EhD-bmuyasV1Np72zw_hQ_nhGhRdoPRDmSBqoR7z6SLm63OIVqvdQg",
              "width" : 4048
           }
        ],
        "place_id" : "ChIJ0cBYHJPKj4ARttjp0aHMa3s",
        "price_level" : 1,
        "rating" : 3.6,
        "reference" : "CmRRAAAAC-91ohuD-J9pdG5NiqQEgQcpdklO7Q0cEB1cgoPHG1stkX646Z6BbXfTLbu_qpFhkyMAjXC8WIbhggh3O5JupIBj-t5IzUd9NB0NsnRwwGE0wptnXPrDVta6Nsm-7qmWEhBIlAM5qG50hPfZYL2KXqr_GhS9zfHPiMtxlZSznSC9g-3zSPiuRQ",
        "scope" : "GOOGLE",
        "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
        "vicinity" : "375 Saratoga Avenue e, San Jose"
      }
    };
  }

  convertPrice = (priceInt) => {
    let ret = '';
    for (let i = 0; i < priceInt; i++) {
      ret += '$';
    }

    return ret === '' ? 'Free' : ret;
  };

  addRandomBox = () => {
    width = Math.floor(20 + (Math.random() * 40));
    height = Math.floor(20 + (Math.random() * 10));
    top = Math.floor(Math.random() * (100));
    left = Math.floor(Math.random() * (200));
    let box = {
      width: width,
      height: height,
      top: top,
      left: left
    };

    console.log('adding a box: ', box);

    this.setState({
      selectedBoxes: [...this.state.selectedBoxes, box]
    });
  };

  render() {
    let highlightBoxes = this.state.selectedBoxes.map((box, idx) => {
      console.log('processing box layout: ', box);
      return (
        <SpringView key={("box_" + box.top)} style={{
          backgroundColor: 'rgba(66, 134, 244, 0.5)',
          borderColor: 'white',
          borderWidth: 2,
          top: box.top,
          left: box.left,
          width: box.width,
          height: box.height,
          position: 'absolute'
          }} />
      );
    });

    return (
      <SafeAreaView onLayout={this.greenViewLayout}
        style={{flex: 1, backgroundColor: 'green'}}>
        <View onLayout={this.blueViewLayout}
          style={{backgroundColor: 'blue', flexDirection: 'row'}}>
          <SearchBar
            containerStyle={{flex: 10}}
            onChangeText={this.searchChangeTextHandler} />
          <Icon
            containerStyle={{flex: 1}}
            name='search'
            onPress={this.addRandomBox} />
        </View>

        <SpringView
          style={{
          top: 50,
          left: 50,
          width: 200,
          height: 50,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: 'rgba(0, 0, 100, 0.5)'
          }} />
        <View onLayout={this.redViewLayout}
          style={{flex: 1, backgroundColor: 'red'}}>
          <ScrollView horizontal={true}>
            <ScrollView>
              <ImageBackground
                source={{uri: 'https://www.nationalparks.org/sites/default/files/shutterstock_142351951.jpg'}}
                style={styles.image}>
                {highlightBoxes}
                <SpringView
                  style={{
                    top: 50,
                    left: 50,
                    width: 200,
                    height: 50,
                    borderWidth: 1,
                    borderColor: 'white',
                    backgroundColor: 'rgba(0, 0, 100, 0.5)'
                  }}
                  />
              </ImageBackground>
            </ScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 1920,
    height: 1272,
  },
});
