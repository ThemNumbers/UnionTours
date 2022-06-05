import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Routes } from '../routes'
import { FavoriteTabStack, MainTabStack, ProfileTabStack } from './stacks'
import { useTheme } from '../../theme'
import { MainTabIcon } from '../../components/Icons/TabBar/MainTabIcon'
import { IS_IOS } from '../../utils/constants'
import { ProfileTabIcon } from '../../components/Icons/TabBar/ProfileTabIcon'
import { LikeIcon } from '../../components/Icons/LikeIcon'

export type BottomTabParamsList = {
  [Routes.MainTab]: undefined
  [Routes.FavoriteTab]: undefined
  [Routes.ProfileTab]: undefined
}

const TabNavigator = createBottomTabNavigator<BottomTabParamsList>()

const HomeTabs: React.FC = () => {
  const { theme } = useTheme()

  return (
    <TabNavigator.Navigator
      screenOptions={{
        lazy: false,
        headerShown: false,
        tabBarHideOnKeyboard: IS_IOS ? false : true,
        tabBarActiveTintColor: theme.colors.cyan_6,
        tabBarInactiveTintColor: theme.colors.gray_7,
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          height: 58,
          paddingTop: 6,
          paddingBottom: 8,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderColor: theme.colors.gray_3,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          lineHeight: 16,
        },
      }}
    >
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MainTabIcon color={focused ? theme.colors.cyan_6 : theme.colors.gray_7} />
          ),
          tabBarLabel: 'Главная',
        }}
        name={Routes.MainTab}
        component={MainTabStack}
      />
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <LikeIcon color={focused ? theme.colors.cyan_6 : theme.colors.gray_7} />
          ),
          tabBarLabel: 'Избранное',
        }}
        name={Routes.FavoriteTab}
        component={FavoriteTabStack}
      />
      <TabNavigator.Screen
        options={{
          lazy: false,
          tabBarIcon: ({ focused }) => (
            <ProfileTabIcon color={focused ? theme.colors.cyan_6 : theme.colors.gray_7} />
          ),
          tabBarLabel: 'Профиль',
        }}
        name={Routes.ProfileTab}
        component={ProfileTabStack}
      />
    </TabNavigator.Navigator>
  )
}

export { HomeTabs }
