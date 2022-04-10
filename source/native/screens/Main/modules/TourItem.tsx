import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Hotel } from '../../../../framework/mobx/interfaces/Tours'
import { EnvironmentIcon } from '../../../components/Icons/EnvironmentIcon'
import { FilledStarIcon } from '../../../components/Icons/FilledStarIcon'
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
      height: 200,
      padding: 16,
      flexDirection: 'row',
      flex: 1,
      backgroundColor: theme.colors.gray_1,
    },
    imageWrapper: {
      width: 117,
      height: '100%',
      overflow: 'hidden',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_3,
    },
    contentContainer: { flex: 1, marginLeft: 16 },
    title: { color: theme.colors.gray_9, flex: 1 },
    image: { width: 117, height: 168 },
    desc: { color: theme.colors.gray_7 },
  })

  return styles
}
interface Props {
  item: Hotel
  isLast?: boolean
  onNewsPress: (item: Hotel) => void
}

const TourItem: React.FC<Props> = ({ item, isLast, onNewsPress }) => {
  const { styles, theme } = useThemeStyles(createStyles)

  const onPress = () => {
    triggerHaptic()
    onNewsPress(item)
  }

  return (
    <TouchableBounce
      onPress={onPress}
      style={[styles.container, { marginBottom: isLast ? 28 : 16 }]}
    >
      <ShadowView type={'hard'} style={styles.shadowStyle}>
        <View style={styles.imageWrapper}>
          <LoadingImage
            uri={
              'https://travelata-a.akamaihd.net/thumbs/320x240/upload/2019_36/content_hotel_5d6f9338a4a7c7.45020788.jpg'
            }
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <StyledText size={'s'} family={'semibold'} numberOfLines={2} style={styles.title}>
              {item.name}
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
                {item.rating ? item.rating.toFixed(1) : '?'}
              </StyledText>
            </View>
          </View>
          <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
            <FilledStarIcon width={16} height={16} color={theme.colors.gold_6} />
            <FilledStarIcon width={16} height={16} color={theme.colors.gold_6} />
            <OutlinedStarIcon width={16} height={16} color={theme.colors.gold_6} />
            <OutlinedStarIcon width={16} height={16} color={theme.colors.gold_6} />
            <OutlinedStarIcon width={16} height={16} color={theme.colors.gold_6} />
          </View>
          <StyledText size={'xs'} family={'regular'} numberOfLines={3} style={styles.desc}>
            Прекрасное место для путешествий и отдыха семьей Очень классный отдых
          </StyledText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <EnvironmentIcon color={theme.colors.blue_6} />
            <StyledText
              size={'xs'}
              family={'medium'}
              numberOfLines={1}
              style={{ color: theme.colors.blue_6, marginLeft: 12 }}
            >
              Большой Сочи: Адлер
            </StyledText>
          </View>
        </View>
      </ShadowView>
    </TouchableBounce>
  )
}

export { TourItem }
