import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { DefaultHeader } from '../DefaultHeader'
import { HeaderActionItem } from '../DefaultHeader/DefaultHeader'
import { StyledText } from '../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    title: { color: theme.colors.gray_9, flex: 1 },
    rightBtnContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingLeft: 16 },
    rightBtnIndicator: {
      width: 8,
      height: 8,
      borderRadius: 8,
      position: 'absolute',
      top: -1,
      right: -1,
      backgroundColor: theme.colors.cyan_6,
    },
  })

  return styles
}
interface Props {
  containerStyle?: StyleProp<ViewStyle>
  showBackButton?: boolean
  title: string
  rightAction?: HeaderActionItem
}

const HeaderWithAction: React.FC<Props> = ({
  title,
  containerStyle,
  showBackButton,
  rightAction,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)

  return (
    <View>
      {showBackButton ? <DefaultHeader /> : null}

      <View style={[styles.headerContainer, containerStyle]}>
        <StyledText size={'xl'} family={'bold'} style={styles.title}>
          {title}
        </StyledText>
        {rightAction ? (
          <TouchableOpacity style={styles.rightBtnContainer} onPress={rightAction.onPress}>
            <View>
              {rightAction.icon ? (
                <rightAction.icon
                  color={rightAction.color || theme.colors.gray_9}
                  size={24}
                  width={24}
                  height={24}
                />
              ) : null}
              {rightAction.text ? (
                <StyledText
                  size={'m'}
                  family={'medium'}
                  style={{ color: rightAction.color || theme.colors.cyan_6 }}
                >
                  Все
                </StyledText>
              ) : null}
              {rightAction.showIndicator ? <View style={styles.rightBtnIndicator} /> : null}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export { HeaderWithAction }
