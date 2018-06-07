import React, { Component } from 'react';
import {
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

import GoogleImageGrid from './GoogleImageGrid'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  goToFullScreenPage = (tappedImage) => {
    console.log('well, i guess i\'m leaving to: ', tappedImage.link);
  };

  render() {
    return(
      <View style={{flex: 1}}>
        <Text>Does anybody here remember Vera Lynn?</Text>
        <GoogleImageGrid
          imageTapHandler={this.goToFullScreenPage}
          restaurantName='Tomi Sushi'
          page='menu'
          />
      </View>
    );
  }
}