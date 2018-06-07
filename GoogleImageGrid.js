import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Alert,
  Animated,
  AppRegistry,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import {
  Button,
  List,
  ListItem,
  Icon,
  SearchBar
} from 'react-native-elements';

const bgColorBody = '#edf3ff';
const bgColorButton = '#224989';
const bgColorHeader = '#bad3ff';
const SEARCH_API_KEY = 'AIzaSyC51KO0Im3YkNhGFWqwO20G37rfXybD1CM';
const CSE_ID = '003174101244656998405:qhkkivskdsk';
const imageMargin = 3;

export default class GoogleImageGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      googleSearchResults: [],
      googleSearchStartIndex: 1,
      refreshing: false,
      restaurantName: props.restaurantName,
      thumbnailWidth: 100,
    };
  }

  componentDidMount() {
    this.getDataFromGoogle()
      .then(() => {
        console.log('first batch was received');
        return this.handleLoadMore();
      })
      .then(() => {
        console.log('second batch was received');
        return this.handleLoadMore();
      });
  }

  renderGoogleImageSearchResult = (googleImage) => {
    return (
      <TouchableHighlight
        onPress={() => this.props.imageTapHandler(googleImage)}>
        <Image source={{uri: googleImage.thumbnail}}
          style={{
            margin: imageMargin,
            width: this.state.thumbnailWidth,
            height: this.state.thumbnailWidth
          }} />
      </TouchableHighlight>
    );
  };

  googleImageKeyExtractor = (item) => item.link;

  buildSearchString = () => {
    let ret = this.props.restaurantName ;

    let extraTerm;
    switch (this.props.page) {
    case 'food':
      extraTerm = 'foods';
      break;

    case 'restaurant':
      extraTerm = '(foods | menu)';
      break;

    case 'menu':
      extraTerm = 'menu';
      break;
    }

    return ret + ' ' + extraTerm;
  };

  getDataFromGoogle = () => {
    const url = `https://www.googleapis.com/customsearch/v1?` +
        `key=${SEARCH_API_KEY}&cx=${encodeURIComponent(CSE_ID)}&` +
        `q=${encodeURIComponent(this.buildSearchString())}&searchType=image` +
        `&num=10&imageType=photo&start=${this.state.googleSearchStartIndex}`;
    console.log("Google Image Url: ", url);
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("got search result from google", res);
        let nextPageStartIndex = 0;
        if (res.queries && res.queries.nextPage && res.queries.nextPage.length > 0) {
          nextPageStartIndex = res.queries.nextPage[0].startIndex;
        }

        const imageInfoList = res.items.map(item => {
          return {
            link: item.link,
            thumbnail: item.image.thumbnailLink
          };
        });

        return new Promise((resolve) => {
          this.setState({
            googleSearchResults: [...this.state.googleSearchResults, ...imageInfoList],
            googleSearchStartIndex: nextPageStartIndex,
            refreshing: false,
          }, () => {
            resolve();
          });
        });
      })
      .catch(error => {
        console.error(error);
        alert('Could not fetch image results');
      });
  };

  handleLoadMore = () => {
    console.log('handleLoadMore was called');

    return this.getDataFromGoogle();
  };

  handleRefresh = () => {
    console.log('handle refresh was called');
    this.setState({
      googleSearchStartIndex: 1,
      googleSearchResults: [],
      refreshing: true,
    }, () => {
      this.getDataFromGoogle();
    });
  };

  imageViewLayoutHandler = (event) => {
    const viewWidth = event.nativeEvent.layout.width;
    const imageWidth = (viewWidth - (6 * imageMargin)) / 3;
    this.setState({
      thumbnailWidth: imageWidth 
    });
  };

  render() {
    return (
      <View onLayout={this.imageViewLayoutHandler} style={{flex: 1}}>
        <List>
          <FlatList
            data={this.state.googleSearchResults}
            keyExtractor={this.googleImageKeyExtractor}
            numColumns={3}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            renderItem={({item}) => this.renderGoogleImageSearchResult(item)} />
        </List>
      </View>
    );
  }
}

GoogleImageGrid.propTypes = {
  imageTapHandler: PropTypes.func.isRequired,
  page: PropTypes.oneOf(['restaurant', 'menu', 'food']).isRequired,
  restaurantName: PropTypes.string.isRequired,
};