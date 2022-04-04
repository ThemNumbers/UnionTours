import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Theme, useThemeStyles } from '../../../theme'
import { BackArrowIcon } from '../../../components/Icons/BackArrowIcon'
import { StyledText } from '../../../components/UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'rgba(26, 32, 44, 0.5)',
      height: 60,
      width: '100%',
      position: 'absolute',
      zIndex: 9,
      top: 0,
      alignItems: 'center',
    },
    backBtnStyle: {
      paddingHorizontal: 16,
      height: 60,
      zIndex: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleTextStyle: { position: 'absolute', left: 0, right: 0, color: theme.colors.gray_1 },
  })

  return styles
}

interface Props {
  currentIndex?: number
  listLength?: number
}

const TopControls: React.FC<Props> = ({ currentIndex, listLength }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtnStyle} onPress={() => navigation.goBack()}>
        <BackArrowIcon color={theme.colors.gray_1} />
      </TouchableOpacity>

      <StyledText size={'l'} family={'bold'} center style={styles.titleTextStyle}>
        {currentIndex} из {listLength}
      </StyledText>
    </View>
  )
}

export { TopControls }
