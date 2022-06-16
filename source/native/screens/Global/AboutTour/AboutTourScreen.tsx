import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { HomeStackParamsList } from '../../../navigation/Home/HomeStack'
import { Routes } from '../../../navigation/routes'
import { StyledText } from '../../../components/UIKit/StyledText'
import { StyledButton } from '../../../components/UIKit/StyledButton'
import { DefaultHeader } from '../../../components/DefaultHeader'
import { FlatListWithDots } from '../../../components/FlatListWithDots'
import { ShareIcon } from '../../../components/Icons/ShareIcon'
import { ImageItem } from './modules/ImageItem'
import { formatSum } from '../../../utils/formatter'
import { useToursStore } from '../../../../framework/mobx/stores'
import { FullApiTourResp, TourImage } from '../../../../framework/mobx/interfaces/Tours'
import { PendingPreview } from '../../../components/PendingWrapper/modules/PendingPreview'
import { StyledCircleIndicator } from '../../../components/UIKit/StyledCircleIndicator'
import { StyledSection } from '../../../components/UIKit/StyledSection'
import { InfoIcon } from '../../../components/Icons/Alert/InfoIcon'
import { GiftIcon } from '../../../components/Icons/ServiceDesk/GiftIcon'
import { FlatListWithTabs } from '../../../components/FlatListWithTabs'
import { LikeIcon } from '../../../components/Icons/LikeIcon'
import { observer } from 'mobx-react'
import { TouchableBounce } from '../../../components/TouchableBounce'
import { LikeOutlinedIcon } from '../../../components/Icons/LikeOutlinedIcon'

const regex = /(<([^>]+)>)/gi

const getDays = (count: number) => {
  return new Array(count).fill(0).map((_, i) => `День ${i + 1}`)
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    titleText: { marginTop: 24, marginHorizontal: 24, color: theme.colors.gray_9 },
    buttonSpace: { height: 24 },
    descText: { color: theme.colors.gray_9, marginTop: 16, marginHorizontal: 24 },
    buttonContainer: { flex: 1, marginRight: 16 },
    listStyle: { marginTop: 24 },
    listCornerStyle: { width: 12 },
    sectionContainer: {
      marginBottom: 0,
      marginHorizontal: 16,
      backgroundColor: theme.colors.gray_2,
      marginTop: 16,
    },
    title: { color: theme.colors.gray_7 },
    text: { color: theme.colors.gray_9, marginTop: 8 },
  })

  return styles
}

interface Props {
  route: RouteProp<HomeStackParamsList, Routes.AboutTourScreen>
  navigation: StackProp<HomeStackParamsList, Routes.AboutTourScreen>
}

const AboutTourScreen: React.FC<Props> = observer(({ navigation, route }) => {
  const { styles, theme } = useThemeStyles(createStyles)
  const { tour } = route.params
  const [fullTour, setFullTour] = useState<FullApiTourResp | undefined>(undefined)
  const { getTour, makeFavorite, favoriteTours } = useToursStore()
  const isFavorite = favoriteTours.find((t) => t.id === tour.id) ? true : false

  useEffect(() => {
    if (!fullTour) {
      getTour(tour.id).then((response) => {
        setFullTour(response.data)
      })
    }
  }, [])

  const renderListCorner = () => <View style={styles.listCornerStyle} />

  const images = fullTour ? fullTour.item.images : tour.image_explore_preview

  const renderImageItem = ({ item, index }: { item: TourImage; index: number }) => (
    <ImageItem
      uri={item.image}
      onPress={() =>
        navigation.navigate(Routes.ImageViewerScreen, {
          images: images.map((i) => i.image),
          initialIndex: index,
          useFastImage: true,
        })
      }
    />
  )

  const renderSectionContent = () =>
    fullTour ? (
      <View style={{ padding: 16 }}>
        <StyledText size={'xs'} family={'semibold'} style={styles.title}>
          Подробное описание
        </StyledText>
        <StyledText size={'m'} family={'semibold'} style={styles.text}>
          {fullTour.item.description.replace(regex, '')}
        </StyledText>
      </View>
    ) : null

  const renderSecondSectionContent = () =>
    fullTour ? (
      <View style={{ padding: 16 }}>
        <StyledText size={'xs'} family={'semibold'} style={styles.title}>
          Включено в стоимость
        </StyledText>
        <StyledText size={'m'} family={'semibold'} style={styles.text}>
          {fullTour.item.included.replace(regex, '')}
        </StyledText>
      </View>
    ) : null

  const renderTabItem = (tab: string, index: number) => {
    const day = fullTour?.item.route[index]

    return (
      <View style={{ flex: 1 }}>
        <StyledText size={'m'} family={'regular'} style={styles.titleText}>
          {day?.day_title.replace(regex, '').replace(/\./g, '.\n\n')}
        </StyledText>

        {/* {day?.day_contents.map((content, idx) => (
          <StyledText key={idx} size={'m'} family={'regular'} style={styles.titleText}>
            {content.description.replace(regex, '')}
          </StyledText>
        ))} */}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <DefaultHeader
        title={'Подробнее о туре'}
        rightActions={[{ icon: ShareIcon, onPress: () => null }]}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <FlatListWithDots
          style={styles.listStyle}
          ListHeaderComponent={renderListCorner}
          ListFooterComponent={renderListCorner}
          data={images}
          renderItem={renderImageItem}
        />
        <StyledText size={'xl'} family={'bold'} style={styles.titleText}>
          {tour.title}
        </StyledText>
        {fullTour ? (
          <View style={{}}>
            <StyledSection
              initialExpanded={false}
              isLoading={fullTour ? false : true}
              containerStyle={styles.sectionContainer}
              title={'Подробное описание'}
              icon={<InfoIcon color={theme.colors.gray_1} size={24} />}
              withChevron={true}
              renderContent={renderSectionContent}
            />
            {fullTour.item.included ? (
              <StyledSection
                initialExpanded={false}
                isLoading={fullTour ? false : true}
                containerStyle={styles.sectionContainer}
                title={'Включено в стоимость'}
                icon={<GiftIcon color={theme.colors.gray_1} size={24} />}
                withChevron={true}
                renderContent={renderSecondSectionContent}
              />
            ) : null}
            <StyledText
              size={'l'}
              family={'bold'}
              style={{ color: theme.colors.gray_9, marginHorizontal: 16, marginTop: 24 }}
            >
              Программа тура
            </StyledText>
            <FlatListWithTabs
              containerStyle={{ marginTop: 16 }}
              data={getDays(fullTour.item.days)}
              renderContent={renderTabItem}
            />
          </View>
        ) : (
          <PendingPreview
            containerStyle={{ flex: 0 }}
            icon={<StyledCircleIndicator size={32} />}
            description={'Загрузка...'}
          />
        )}
        <View style={styles.buttonSpace} />
      </ScrollView>
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 24 }}>
        <StyledButton
          containerStyle={styles.buttonContainer}
          title={`Купить от ${formatSum(Number(tour.price))}`}
          onPress={() => navigation.goBack()}
        />
        <TouchableBounce
          onPress={() => makeFavorite(tour)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            borderWidth: 1,
            backgroundColor: isFavorite ? theme.colors.cyan_6 : theme.colors.gray_1,
            borderColor: theme.colors.cyan_6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isFavorite ? (
            <LikeIcon color={theme.colors.gray_1} />
          ) : (
            <LikeOutlinedIcon color={theme.colors.cyan_6} />
          )}
        </TouchableBounce>
      </View>
    </View>
  )
})

export { AboutTourScreen }
