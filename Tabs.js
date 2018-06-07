import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import {Icon} from 'react-native-elements';
import UploadScreen from './Upload';
 
class TabScreen extends Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>{this.props.title}</Text></View>
    );
  }
}

class TopTab1 extends Component {
  render () {
    return (<TabScreen title="Top tab1" />);
  }
}

class TopTab2 extends Component {
  render () {
    return (<TabScreen title="Top tab2" />);
  }
}

const TopTabs = createMaterialTopTabNavigator(
  {
    'TopTab1': TopTab1,
    'TopTab2': TopTab2,
  },
  {
    initialRouteName: 'TopTab2',
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {
        paddingTop: 5,
      } 
     }
  }
);

class HomeScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>HOME</Text>
      </View>
    );
  }
}

class BottomTab2 extends Component {
  render () {
    return (<TabScreen title="Settings Screen!" />);
  }
}

const BottomTabs = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({focused}) => <Icon name='home' color={focused ? 'white' : 'gray'} />
      },
    },
    UploadScreen: {
      screen: UploadScreen,
      navigationOptions: {
        title: 'Upload',
        tabBarVisible: false,
        tabBarIcon: () => <Icon name='add-box' color='gray' />
      }
    },
    SettingsScreen: {
      screen: BottomTab2,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: ({focused}) => <Icon name='settings' type='featuer' color={focused ? 'white' : 'gray'} />
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#0c1096'
      }
    },
    swipeEnabled: false,
    animationEnabled: false,
  }
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BottomTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});