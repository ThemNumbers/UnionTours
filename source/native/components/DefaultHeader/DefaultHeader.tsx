import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { BackArrowIcon } from '../Icons/BackArrowIcon'
import { Theme, useThemeStyles } from '../../theme'
import { StyledText } from '../UIKit/StyledText'
import { IIconProps } from '../Icons/IIconProps'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 56,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray_3,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.gray_9,
      flex: 1,
    },
    contentContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    actionsWrapper: { alignItems: 'center', flexDirection: 'row' },
    btnContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionContainer: {
      paddingHorizontal: 16,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 8,
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: theme.colors.cyan_6,
    },
  })

  return styles
}

export interface HeaderActionItem {
  text?: string
  icon?: React.FC<IIconProps>
  color?: string
  showIndicator?: boolean
  onPress: () => void
}

interface Props {
  title?: string
  hideBackButton?: boolean
  containerStyle?: StyleProp<ViewStyle>
  onBackPress?: () => void
  rightActions?: Array<HeaderActionItem>
}

const DefaultHeader: React.FC<Props> = ({
  title,
  hideBackButton,
  containerStyle,
  onBackPress,
  rightActions,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const navigation = useNavigation()

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          disabled={hideBackButton}
          onPress={onBackPress ? onBackPress : () => navigation.goBack()}
        >
          {hideBackButton ? (
            <View style={{ width: 24, height: 24 }} />
          ) : (
            <BackArrowIcon color={theme.colors.gray_9} />
          )}
        </TouchableOpacity>

        {title ? (
          <StyledText size={'l'} family={'semibold'} numberOfLines={2} center style={styles.title}>
            {title}
          </StyledText>
        ) : null}
      </View>

      {rightActions ? (
        <View style={styles.actionsWrapper}>
          {rightActions.map((action, idx) => (
            <TouchableOpacity key={idx} style={styles.actionContainer} onPress={action.onPress}>
              <View>
                {action.icon ? (
                  <action.icon
                    color={action.color || theme.colors.gray_9}
                    size={24}
                    width={24}
                    height={24}
                  />
                ) : null}
                {action.showIndicator ? <View style={styles.dot} /> : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={{ width: 24, height: 24, marginHorizontal: 16 }} />
      )}
    </View>
  )
}

export { DefaultHeader }
