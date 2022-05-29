/* eslint-disable react-native/no-unused-styles */
import React from 'react'
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native'
import { IS_IOS } from '../../utils/constants'

const styles = StyleSheet.create({
  hard: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowColor: IS_IOS ? '#4A5568' : '#b1bac9',
    shadowRadius: 8,
    elevation: 8,
  },
  medium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowColor: IS_IOS ? '#4A5568' : '#b1bac9',
    shadowRadius: 20,
    elevation: 10,
  },
  light: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowColor: IS_IOS ? '#4A5568' : '#b1bac9',
    shadowRadius: 40,
    elevation: 20,
  },
  none: {},
})

type ShadowType = 'hard' | 'medium' | 'light' | 'none'
interface Props {
  style: StyleProp<ViewStyle>
  type: ShadowType
}

const ShadowView: React.FC<Props> = ({ children, style, type }) => (
  <View style={[styles[type], style]}>{children}</View>
)

export { ShadowView }
