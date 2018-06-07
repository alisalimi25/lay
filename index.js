import { AppRegistry } from 'react-native';
import App from './Tabs';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('lay', () => App);
