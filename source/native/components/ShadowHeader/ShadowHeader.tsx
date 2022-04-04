import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { BackArrowIcon } from '../Icons/BackArrowIcon'
import { ShadowView } from '../ShadowView'
import { StyledText } from '../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'space-between',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      backgroundColor: theme.colors.gray_1,
    },
    title: { color: theme.colors.gray_9 },
    rightBtnContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    rightBtnIndicator: {
      width: 8,
      height: 8,
      borderRadius: 8,
      position: 'absolute',
      top: -1,
      right: -1,
      backgroundColor: theme.colors.blue_6,
    },
    backBtnContainer: {
      paddingHorizontal: 16,
      alignItems: 'center',
      paddingTop: 24,
      alignSelf: 'flex-start',
      justifyContent: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingTop: 20,
      paddingBottom: 16,
      justifyContent: 'space-between',
    },
  })

  return styles
}
interface Props {
  showBackButton?: boolean
  title: string
  showIndicator?: boolean
  onButtonPress?: () => void
  btnIcon?: React.ReactNode
}

const ShadowHeader: React.FC<Props> = ({
  title,
  showBackButton,
  showIndicator,
  onButtonPress,
  btnIcon,
  children,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const navigation = useNavigation()

  return (
    <ShadowView style={styles.container} type={'light'}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
          <BackArrowIcon color={theme.colors.gray_9} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.headerContainer}>
        <StyledText size={'xl'} family={'bold'} center style={styles.title}>
          {title}
        </StyledText>
        {btnIcon && onButtonPress ? (
          <TouchableOpacity style={styles.rightBtnContainer} onPress={onButtonPress}>
            <View>
              {btnIcon}
              {showIndicator ? <View style={styles.rightBtnIndicator} /> : null}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      {children}
    </ShadowView>
  )
}

export { ShadowHeader }
