/* eslint-disable react-native/no-unused-styles */
import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { MinusSymbolIcon } from '../Icons/MinusSymbolIcon'
import { PlusSymbolIcon } from '../Icons/PlusSymbolIcon'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    commonPart: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.gray_4,
      backgroundColor: theme.colors.gray_3,
    },
    left: {
      borderRightWidth: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    middle: {
      borderRadius: 0,
    },
    right: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    label: {
      marginBottom: 8,
      color: theme.colors.gray_9,
    },
    requiredMark: {
      color: theme.colors.red_6,
    },
  })

  return styles
}

interface Props {
  label?: string
  isRequired?: boolean
  containerStyle?: StyleProp<ViewStyle>
  value: number
  onChange: (value: number) => void
}

const StyledCounter: React.FC<Props> = ({ label, containerStyle, isRequired, value, onChange }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const middleStyle = {
    borderColor: value > 0 ? theme.colors.cyan_6 : theme.colors.gray_4,
    backgroundColor: value > 0 ? theme.colors.cyan_6 : theme.colors.gray_2,
  }
  const minusColor = value === 0 ? theme.colors.gray_5 : theme.colors.gray_8
  const plusColor = value === 99 ? theme.colors.gray_5 : theme.colors.gray_8
  const counterColor = value > 0 ? theme.colors.gray_1 : theme.colors.gray_7

  const onChangeCounter = (position: 'left' | 'middle' | 'right') => {
    const nextValue = position === 'left' ? value - 1 : value + 1
    if (nextValue >= 0 && nextValue < 100) {
      onChange(nextValue)
    }
  }

  const renderPart = (position: 'left' | 'middle' | 'right') => (
    <TouchableOpacity
      disabled={position === 'middle'}
      activeOpacity={0.7}
      onPress={() => onChangeCounter(position)}
      style={[styles.commonPart, styles[position], position === 'middle' && middleStyle]}
    >
      {position === 'left' ? (
        <MinusSymbolIcon color={minusColor} />
      ) : position === 'right' ? (
        <PlusSymbolIcon color={plusColor} />
      ) : (
        <StyledText size={'m'} family={'bold'} style={{ color: counterColor }}>
          {value}
        </StyledText>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={containerStyle}>
      {label ? (
        <StyledText size={'m'} family={'semibold'} style={styles.label}>
          {label}
          {isRequired ? (
            <StyledText size={'m'} family={'semibold'} style={styles.requiredMark}>
              *
            </StyledText>
          ) : null}
        </StyledText>
      ) : null}
      <View style={styles.container}>
        {renderPart('left')}
        {renderPart('middle')}
        {renderPart('right')}
      </View>
    </View>
  )
}

export { StyledCounter }
