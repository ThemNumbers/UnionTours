import Clipboard from '@react-native-clipboard/clipboard'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Pending } from '../../../framework/mobx/interfaces/Tours'
import { Theme, useThemeStyles } from '../../theme'
import { showAlert } from '../../utils/showAlert'
import { StyledCircleIndicator } from './StyledCircleIndicator'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { marginBottom: 12 },
    label: { color: theme.colors.gray_7, flex: 1 },
    titleContainer: { flexDirection: 'row', alignItems: 'center' },
    loadingContainer: { width: 24, height: 24, justifyContent: 'flex-end' },
    rightActionText: { color: theme.colors.cyan_6 },
    blockText: { color: theme.colors.cyan_6 },
    valueText: { color: theme.colors.gray_9 },
    blockContainer: {
      paddingVertical: 4,
      marginTop: 4,
      alignSelf: 'flex-start',
      borderRadius: 4,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.blue_1,
    },
  })

  return styles
}

export interface StyledTextBlockProps {
  label: string
  value?: string
  color?: string
  bgColor?: string
  inBlock?: boolean
  titleRightActionText?: string
  withLinking?: boolean
  pending?: Pending
  selectable?: boolean
  onTitleRightActionPress?: () => void
  onPress?: () => void
  onLongPress?: () => void
}

const StyledTextBlock: React.FC<StyledTextBlockProps> = ({
  label,
  value,
  color,
  bgColor,
  inBlock,
  titleRightActionText,
  withLinking,
  pending,
  selectable,
  onTitleRightActionPress,
  onPress,
  onLongPress,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const isLoading = [Pending.LOADING, Pending.CLEAR].some((i) => i === pending)
  const colorStyle = color ? { color: color } : undefined
  const bgColorStyle = bgColor ? { backgroundColor: bgColor } : undefined

  const onCopyToClipboard = () => {
    if (value) {
      Clipboard.setString(value)
      showAlert({ type: 'success', body: 'Скопировано!' })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <StyledText size={'xs'} family={'semibold'} style={styles.label}>
          {label}
        </StyledText>
        {titleRightActionText && onTitleRightActionPress ? (
          <TouchableOpacity onPress={onTitleRightActionPress}>
            <StyledText size={'xs'} family={'semibold'} style={styles.rightActionText}>
              {titleRightActionText}
            </StyledText>
          </TouchableOpacity>
        ) : null}
      </View>
      {inBlock && value ? (
        <View style={[styles.blockContainer, bgColorStyle]}>
          <StyledText
            size={'xs'}
            withLinking={withLinking}
            family={'regular'}
            style={[styles.blockText, colorStyle]}
          >
            {value}
          </StyledText>
        </View>
      ) : isLoading ? (
        <View style={styles.loadingContainer}>
          <StyledCircleIndicator size={15} strokeColor={theme.colors.gray_9} />
        </View>
      ) : (
        <StyledText
          onPress={onPress}
          onLongPress={selectable ? onCopyToClipboard : onLongPress}
          size={'m'}
          family={'semibold'}
          withLinking={withLinking}
          style={[styles.valueText, colorStyle]}
        >
          {value ? value : '—'}
        </StyledText>
      )}
    </View>
  )
}

export { StyledTextBlock }
