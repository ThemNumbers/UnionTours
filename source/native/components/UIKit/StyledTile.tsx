import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { IS_TABLET } from '../../utils/constants'
import { GradientIconWrapper } from '../Icons/GradientIconWrapper'
import { IIconProps } from '../Icons/IIconProps'
import { ShadowView } from '../ShadowView'
import { TouchableBounce } from '../TouchableBounce'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { marginBottom: 16, marginHorizontal: 8 },
    titleStyle: { marginTop: 16, color: theme.colors.gray_9 },
    descriptionStyle: { flex: 1, marginTop: 8, color: theme.colors.gray_8 },
    shadowWrapper: {
      borderRadius: 16,
      padding: 16,
      paddingBottom: 24,
      flex: 1,
      elevation: 5,
      backgroundColor: theme.colors.gray_1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  return styles
}

interface Props {
  title: string
  description: string
  getIconByType: () => React.FC<IIconProps>
  onPress: () => void
}

const StyledTile: React.FC<Props> = ({ title, description, getIconByType, onPress }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const { width } = useWindowDimensions()
  const Icon = getIconByType()
  const HORIZONTAL_OFFSET = 32
  const ITEM_OFFSET = 16
  const itemWidth = IS_TABLET ? 164 : (width - HORIZONTAL_OFFSET - ITEM_OFFSET) / 2
  const itemHeight = 192
  const sizeStyle = { width: itemWidth, height: itemHeight }

  return (
    <TouchableBounce onPress={onPress} style={[styles.container, sizeStyle]}>
      <ShadowView type={'hard'} style={styles.shadowWrapper}>
        <View style={styles.iconContainer}>
          <GradientIconWrapper color={theme.colors.cyan_6} style={{ position: 'absolute' }} />
          <Icon color={theme.colors.gray_1} />
        </View>
        <StyledText size={'s'} family={'medium'} style={styles.titleStyle}>
          {title}
        </StyledText>
        <StyledText
          size={'xs'}
          family={'regular'}
          numberOfLines={4}
          style={styles.descriptionStyle}
        >
          {description}
        </StyledText>
      </ShadowView>
    </TouchableBounce>
  )
}

export { StyledTile }
