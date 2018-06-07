import React from 'react';
import { PermissionsAndroid, Text, View } from 'react-native';
import {Icon} from 'react-native-elements';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation';

class PhotoLibrary extends React.Component {
  render () {
    return (
      <View>
        <Text>Top tab1</Text>
      </View>
    );
  }
}

class TopTab2 extends React.Component {
  render () {
    return (<View><Text>Top tab2</Text></View>);
  }
}

const TopTabs = createMaterialTopTabNavigator(
  {
    'TopTab1': TopTab1,
    'TopTab2': TopTab2,
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {
        paddingTop: 5,
        backgroundColor: 'black',
      } 
     }
  }
);

export default TopTabs;