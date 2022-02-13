import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {HomeStack} from './stacks/HomeStack';

export const AppContainer: React.FC = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer theme={DefaultTheme}>
      <HomeStack />
    </NavigationContainer>
  );
};
