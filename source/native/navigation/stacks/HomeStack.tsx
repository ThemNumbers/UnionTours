import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../routes';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {MainScreen} from '../../screens/Main';

export const baseScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
  cardStyle: {backgroundColor: '#F7F9FE'},
  detachPreviousScreen: false,
};

export type HomeStackParamsList = {
  [Routes.MainScreen]: undefined;
  [Routes.AboutTourScreen]: undefined;
  [Routes.FiltersListScreen]: undefined;
  [Routes.FilterScreen]: undefined;
  [Routes.ImageViewerScreen]: {images: Array<string>; initialIndex?: number};
};

const Stack = createStackNavigator<HomeStackParamsList>();

const emptyComp: React.FC = () => <></>;

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={baseScreenOptions}>
    <Stack.Screen name={Routes.MainScreen} component={MainScreen} />
    <Stack.Screen name={Routes.AboutTourScreen} component={emptyComp} />
    <Stack.Screen name={Routes.FiltersListScreen} component={emptyComp} />
    <Stack.Screen name={Routes.FilterScreen} component={emptyComp} />
    <Stack.Screen name={Routes.ImageViewerScreen} component={emptyComp} />
  </Stack.Navigator>
);

export {HomeStack};
