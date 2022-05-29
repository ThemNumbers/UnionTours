import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Alert } from '../../../framework/redux/interfaces/Alerts'
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
      paddingVertical: 12,
      alignItems: 'center',
      paddingHorizontal: 16,
      flexDirection: 'row',
      backgroundColor: theme.colors.gray_1,
    },
    title: { color: theme.colors.gray_9 },
    textContainer: { flex: 1, marginLeft: 8 },
    leftBtnText: { color: theme.colors.blue_6 },
    rightBtnText: { color: theme.colors.blue_6, marginLeft: 24 },
    iconContainer: {
      width: 24,
      height: 24,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
    },
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

  return (
    <TouchableBounce
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <ShadowView type={'light'} style={styles.shadowWrapper}>
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
            <StyledText size={'m'} family={'semibold'} style={styles.title}>
              {alert.title}
            </StyledText>
          ) : null}
          {alert.body ? (
            <StyledText
              size={'xs'}
              family={'semibold'}
              numberOfLines={4}
              style={{
                marginTop: alert.title ? 4 : 0,
                color: alert.title ? theme.colors.gray_8 : theme.colors.gray_9,
              }}
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
