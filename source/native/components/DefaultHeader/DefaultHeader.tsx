import * as React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { BackArrowIcon } from '../Icons/BackArrowIcon'
import { Theme, useThemeStyles } from '../../theme'
import { FilterIcon } from '../Icons/FilterIcon'
import { StyledText } from '../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 56,
      justifyContent: 'center',
      marginTop: 12,
    },
    title: { color: theme.colors.gray_9 },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backBtnContainer: {
      paddingHorizontal: 16,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      position: 'absolute',
      left: 56,
      right: 56,
      zIndex: 0,
    },
    filtersBtnContainer: {
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
      backgroundColor: theme.colors.blue_6,
    },
  })

  return styles
}

interface Props {
  title: string
  customTitle?: React.ReactNode
  customRightButton?: React.ReactNode
  filterIsActivated?: boolean
  showFilters?: boolean
  containerStyle?: StyleProp<ViewStyle>
  onPressLeftButton?: () => void
  onFilterPress?: () => void
}

const DefaultHeader: React.FC<Props> = ({
  title,
  customTitle,
  customRightButton,
  filterIsActivated,
  showFilters,
  containerStyle,
  onPressLeftButton,
  onFilterPress,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const navigation = useNavigation()

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.backBtnContainer}
          onPress={onPressLeftButton ? onPressLeftButton : () => navigation.goBack()}
        >
          <BackArrowIcon color={theme.colors.gray_9} />
        </TouchableOpacity>

        <View pointerEvents={'none'} style={styles.titleContainer}>
          {customTitle ? (
            customTitle
          ) : (
            <StyledText size={'l'} family={'bold'} numberOfLines={2} center style={styles.title}>
              {title}
            </StyledText>
          )}
        </View>

        {customRightButton ? (
          customRightButton
        ) : showFilters ? (
          <TouchableOpacity style={styles.filtersBtnContainer} onPress={onFilterPress}>
            <View>
              <FilterIcon color={theme.colors.gray_9} />
              {filterIsActivated ? <View style={styles.dot} /> : null}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export { DefaultHeader }
