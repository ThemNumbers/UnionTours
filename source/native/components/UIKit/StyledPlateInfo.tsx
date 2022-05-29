import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { ChevronRightIcon } from '../Icons/ChevronRightIcon'
import { ShadowView } from '../ShadowView'
import { TouchableBounce } from '../TouchableBounce'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { marginBottom: 8 },
    titleStyle: { marginLeft: 16, flex: 1, color: theme.colors.gray_8 },
    shadowWrapper: {
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme.colors.gray_1,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
  })

  return styles
}
interface Props {
  title: string
  icon: React.ReactNode
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
}

const StyledPlateInfo: React.FC<Props> = ({ title, icon, onPress, containerStyle }) => {
  const { theme, styles } = useThemeStyles(createStyles)

  return (
    <TouchableBounce onPress={onPress} style={[styles.container, containerStyle]}>
      <ShadowView type={'light'} style={styles.shadowWrapper}>
        <View style={styles.contentContainer}>
          {icon}
          <StyledText size={'s'} family={'medium'} numberOfLines={1} style={styles.titleStyle}>
            {title}
          </StyledText>
        </View>
        <ChevronRightIcon color={theme.colors.gray_8} />
      </ShadowView>
    </TouchableBounce>
  )
}

export { StyledPlateInfo }
