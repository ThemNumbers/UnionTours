import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../../routes'
import { baseScreenOptions } from '../../AppContainer'
import { ProfileTabScreen } from '../../../screens/ProfileTab'
import { AboutProfileScreen } from '../../../screens/ProfileTab/screens/AboutProfile/AboutProfileScreen'
import { AboutAppScreen } from '../../../screens/ProfileTab/screens/AboutApp/AboutAppScreen'
import { HomeStackParamsList } from '../HomeStack'

type ProfileTabStackParamsList = {
  [Routes.ProfileTabScreen]: undefined
  [Routes.AboutProfileScreen]: undefined
  [Routes.AboutAppScreen]: undefined
}

export type UnionProfileTabStackParamsList = ProfileTabStackParamsList & HomeStackParamsList

const Stack = createStackNavigator<ProfileTabStackParamsList>()

const ProfileTabStack: React.FC = () => (
  <Stack.Navigator screenOptions={baseScreenOptions}>
    <Stack.Screen name={Routes.ProfileTabScreen} component={ProfileTabScreen} />
    <Stack.Screen name={Routes.AboutProfileScreen} component={AboutProfileScreen} />
    <Stack.Screen name={Routes.AboutAppScreen} component={AboutAppScreen} />
  </Stack.Navigator>
)

export { ProfileTabStack }
