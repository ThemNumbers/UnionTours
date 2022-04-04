import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Pending } from '../../../framework/mobx/interfaces/Tours'
import { Theme, useThemeStyles } from '../../theme'
import { StyledText } from '../UIKit/StyledText'
import { StyledTextBlock, StyledTextBlockProps } from '../UIKit/StyledTextBlock'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    label: { marginBottom: 16, color: theme.colors.gray_9 },
  })

  return styles
}

interface Props {
  textsArray: Array<StyledTextBlockProps | undefined>
  label?: string
  pending?: Pending
  containerStyle?: StyleProp<ViewStyle>
}

const TextBlockArray: React.FC<Props> = ({ textsArray, pending, containerStyle, label }) => {
  const { styles } = useThemeStyles(createStyles)

  return (
    <View style={containerStyle}>
      {label ? (
        <StyledText size={'l'} family={'bold'} style={styles.label}>
          {label}
        </StyledText>
      ) : null}
      {textsArray.map((item, index) =>
        item ? <StyledTextBlock key={index} pending={pending} {...item} /> : null
      )}
    </View>
  )
}

export { TextBlockArray }
