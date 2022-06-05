import React from 'react'
import { StyleSheet, useWindowDimensions, View, TouchableOpacity } from 'react-native'
import { Tour } from '../../../../framework/mobx/interfaces/Tours'
import { regions } from '../../../../framework/mobx/mocks/Filters'
import { FieldTimeIcon } from '../../../components/Icons/FieldTimeIcon'
import { LikeIcon } from '../../../components/Icons/LikeIcon'
import { LikeOutlinedIcon } from '../../../components/Icons/LikeOutlinedIcon'
import { LocationIcon } from '../../../components/Icons/LocationIcon'
import { LoadingImage } from '../../../components/LoadingImage'
import { ShadowView } from '../../../components/ShadowView'
import { TouchableBounce } from '../../../components/TouchableBounce'
import { StyledText } from '../../../components/UIKit/StyledText'
import { Theme, useThemeStyles } from '../../../theme'
import { formatSum, getPlural } from '../../../utils/formatter'
import { triggerHaptic } from '../../../utils/haptic'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 16,
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: { color: theme.colors.gray_9, marginTop: 12, flex: 1 },
    iconContainer: { alignItems: 'center', flexDirection: 'row' },
    footerText: { color: theme.colors.gray_8, marginLeft: 8 },
    priceContainer: {
      position: 'absolute',
      top: 8,
      left: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: 'rgba(81, 173, 119, 0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    price: { color: theme.colors.gray_1 },
    likeContainer: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      width: 50,
      height: 50,
      borderRadius: 16,
      backgroundColor: 'rgba(65, 72, 88, 0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageWrapper: {
      overflow: 'hidden',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_3,
    },
  })

  return styles
}
interface Props {
  item: Tour
  isFavorite: boolean
  onCardPress: (item: Tour) => void
  onMakeFavorite: (item: Tour) => void
}

const TourItem: React.FC<Props> = ({ item, isFavorite, onMakeFavorite, onCardPress }) => {
  const { styles, theme } = useThemeStyles(createStyles)
  const { width } = useWindowDimensions()
  const IMAGE_WIDTH = width - 32
  const IMAGE_HEIGHT = width * 0.7725
  const currentRegion = regions.find((r) => r.id === item.region[0])

  const onPress = () => {
    triggerHaptic()
    onCardPress(item)
  }

  const onLikePress = () => {
    triggerHaptic()
    onMakeFavorite(item)
  }

  return (
    <TouchableBounce onPress={onPress} style={styles.container}>
      <ShadowView
        type={'hard'}
        style={[
          {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
          },
          styles.imageWrapper,
        ]}
      >
        <LoadingImage
          uri={item.image_explore_preview[0].image}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
          }}
          resizeMode={'cover'}
        />
        <TouchableOpacity onPress={onLikePress} style={styles.likeContainer}>
          {isFavorite ? (
            <LikeIcon color={theme.colors.gray_1} style={{ opacity: 1 }} />
          ) : (
            <LikeOutlinedIcon color={theme.colors.gray_1} />
          )}
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <StyledText size={'s'} family={'semibold'} numberOfLines={1} style={styles.price}>
            от {formatSum(Number(item.price))}
          </StyledText>
        </View>
      </ShadowView>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <FieldTimeIcon color={theme.colors.cyan_6} />
          <StyledText size={'s'} family={'semibold'} numberOfLines={1} style={styles.footerText}>
            {item.nights} {getPlural(Number(item.nights), ['ночь', 'ночи', 'ночей'])}
          </StyledText>
        </View>
        <View style={styles.iconContainer}>
          <LocationIcon color={theme.colors.cyan_6} />
          <StyledText size={'s'} family={'semibold'} numberOfLines={1} style={styles.footerText}>
            {currentRegion?.title}
          </StyledText>
        </View>
      </View>
      <StyledText size={'m'} family={'bold'} numberOfLines={2} style={styles.title}>
        {item.title}
      </StyledText>
    </TouchableBounce>
  )
}

export { TourItem }
