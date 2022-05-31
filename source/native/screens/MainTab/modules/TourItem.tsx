import React from 'react'
import { Dimensions, StyleSheet, useWindowDimensions, View } from 'react-native'
import { Tour } from '../../../../framework/mobx/interfaces/Tours'
import { FilledStarIcon } from '../../../components/Icons/FilledStarIcon'
import { LikeIcon } from '../../../components/Icons/LikeIcon'
import { OutlinedStarIcon } from '../../../components/Icons/OutlinedStarIcon'
import { LoadingImage } from '../../../components/LoadingImage'
import { ShadowView } from '../../../components/ShadowView'
import { TouchableBounce } from '../../../components/TouchableBounce'
import { StyledText } from '../../../components/UIKit/StyledText'
import { Theme, useThemeStyles } from '../../../theme'
import { triggerHaptic } from '../../../utils/haptic'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 16,
      borderRadius: 16,
      flex: 1,
      backgroundColor: theme.colors.gray_1,
    },
    shadowStyle: {
      borderRadius: 16,
      height: 400,
      flexDirection: 'row',
      flex: 1,
      backgroundColor: theme.colors.gray_1,
    },
    imageWrapper: {
      width: '100%',
      height: 300,
      overflow: 'hidden',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_3,
    },
    contentContainer: { flex: 1, marginLeft: 16 },
    title: { color: theme.colors.gray_9, flex: 1 },
    image: { width: Dimensions.get('window').width, height: 300 },
    desc: { color: theme.colors.gray_7 },
  })

  return styles
}
interface Props {
  item: Tour
  isLast?: boolean
  onItemPress: (item: Tour) => void
}

const TourItem: React.FC<Props> = ({ item, isLast, onItemPress }) => {
  const { styles, theme } = useThemeStyles(createStyles)
  const { width } = useWindowDimensions()
  const ITEM_WIDTH = width - 32
  const ITEM_HEIGHT = width * 0.7725

  const onPress = () => {
    triggerHaptic()
    onItemPress(item)
  }

  return (
    <TouchableBounce
      onPress={onPress}
      style={[styles.container, { marginBottom: isLast ? 28 : 16 }]}
    >
      <ShadowView type={'hard'} style={styles.shadowStyle}>
        <View style={styles.imageWrapper}>
          <LoadingImage
            uri={item.image_explore_preview[0].image}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
            }}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <StyledText size={'s'} family={'semibold'} numberOfLines={2} style={styles.title}>
              {item.title}
            </StyledText>
            <View
              style={{
                backgroundColor: theme.colors.green_6,
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                marginLeft: 16,
              }}
            >
              <StyledText
                size={'xs'}
                family={'semibold'}
                numberOfLines={2}
                style={{ color: theme.colors.gray_1 }}
              >
                {item.days ? item.days : '?'}
              </StyledText>
            </View>
          </View>
          <StyledText size={'xs'} family={'regular'} numberOfLines={3} style={styles.desc}>
            {item.city}
          </StyledText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LikeIcon color={theme.colors.cyan_6} />
            <StyledText
              size={'xs'}
              family={'medium'}
              numberOfLines={1}
              style={{ color: theme.colors.cyan_6, marginLeft: 12 }}
            >
              от {item.price}
            </StyledText>
          </View>
        </View>
      </ShadowView>
    </TouchableBounce>
  )
}

export { TourItem }
