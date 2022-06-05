import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Alert } from '../../../framework/mobx/interfaces/Alerts'
import { Theme, useThemeStyles } from '../../theme'
import { ErrorIcon } from '../Icons/Alert/ErrorIcon'
import { InfoIcon } from '../Icons/Alert/InfoIcon'
import { SuccessIcon } from '../Icons/Alert/SuccessIcon'
import { WarnIcon } from '../Icons/Alert/WarnIcon'
import { ShadowView } from '../ShadowView'
import { TouchableBounce } from '../TouchableBounce'
import { StyledText } from '../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingBottom: 20,
      marginHorizontal: 16,
    },
    shadowWrapper: {
      width: '100%',
      minHeight: 48,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
    },
    title: { color: theme.colors.gray_9 },
    textContainer: { flex: 1, marginLeft: 8 },
    leftBtnText: { color: theme.colors.blue_6 },
    rightBtnText: { color: theme.colors.blue_6, marginLeft: 24 },
    iconContainer: {
      width: 20,
      height: 20,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
    },
    bodyText: { color: theme.colors.gray_8 },
    space: { marginTop: 4 },
  })

  return styles
}

interface Props {
  alert: Alert
  containerStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  onHide?: () => void
}

const AlertItem: React.FC<Props> = ({ alert, containerStyle, onPress, onHide }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const bgColor = alert.fillBackground
    ? alert.type === 'info'
      ? theme.colors.blue_1
      : alert.type === 'success'
      ? theme.colors.green_1
      : alert.type === 'warning'
      ? theme.colors.yellow_1
      : theme.colors.red_1
    : theme.colors.gray_1

  return (
    <TouchableBounce
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <ShadowView type={'light'} style={[styles.shadowWrapper, { backgroundColor: bgColor }]}>
        <View style={styles.iconContainer}>
          {alert.type === 'info' ? (
            <InfoIcon size={16} />
          ) : alert.type === 'success' ? (
            <SuccessIcon size={16} />
          ) : alert.type === 'warning' ? (
            <WarnIcon size={16} />
          ) : (
            <ErrorIcon size={16} />
          )}
        </View>
        <View style={styles.textContainer}>
          {alert.title ? (
            <StyledText size={'s'} family={'bold'} style={styles.title}>
              {alert.title}
            </StyledText>
          ) : null}
          {alert.body ? (
            <StyledText
              size={'s'}
              family={'regular'}
              numberOfLines={4}
              style={[styles.bodyText, alert.title ? styles.space : undefined]}
            >
              {alert.body}
            </StyledText>
          ) : null}

          {alert.withButtons ? (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={onPress}>
                <StyledText size={'m'} family={'semibold'} style={styles.leftBtnText}>
                  {alert.leftBtnText || 'Посмотреть'}
                </StyledText>
              </TouchableOpacity>
              <TouchableOpacity onPress={onHide}>
                <StyledText size={'m'} family={'semibold'} style={styles.rightBtnText}>
                  {alert.rightBtnText || 'Закрыть'}
                </StyledText>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ShadowView>
    </TouchableBounce>
  )
}

export { AlertItem }
