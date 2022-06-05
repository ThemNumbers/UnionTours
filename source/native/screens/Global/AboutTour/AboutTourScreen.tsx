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

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    titleText: { marginTop: 24, marginHorizontal: 24, color: theme.colors.gray_9 },
    buttonSpace: { height: 24 },
    descText: { color: theme.colors.gray_9, marginTop: 16, marginHorizontal: 24 },
    buttonContainer: { marginHorizontal: 16, marginBottom: 24 },
    listStyle: { marginTop: 24 },
    listCornerStyle: { width: 12 },
    sectionContainer: { marginBottom: 0, backgroundColor: theme.colors.gray_2, marginTop: 16 },
    title: { color: theme.colors.gray_7 },
    text: { color: theme.colors.gray_9, marginTop: 8 },
  })

  return styles
}

interface Props {
  route: RouteProp<HomeStackParamsList, Routes.AboutTourScreen>
  navigation: StackProp<HomeStackParamsList, Routes.AboutTourScreen>
}

const AboutTourScreen: React.FC<Props> = ({ navigation, route }) => {
  const { styles, theme } = useThemeStyles(createStyles)
  const { tour } = route.params
  const [fullTour, setFullTour] = useState<FullApiTourResp | undefined>(undefined)
  const { getTour } = useToursStore()

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
          {fullTour.item.description}
        </StyledText>
      </View>
    ) : null

  const renderTabItem = (tab: string) => {
    return (
      <View
        style={{ height: 300, width: '100%', marginTop: 16, backgroundColor: theme.colors.blue_2 }}
      />
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
          <View style={{ padding: 16 }}>
            <StyledSection
              initialExpanded={false}
              isLoading={fullTour ? false : true}
              containerStyle={styles.sectionContainer}
              title={'Подробное описание'}
              icon={<InfoIcon color={theme.colors.gray_1} size={24} />}
              withChevron={true}
              renderContent={renderSectionContent}
            />
            <StyledSection
              initialExpanded={false}
              isLoading={fullTour ? false : true}
              containerStyle={styles.sectionContainer}
              title={'Включено в стоимость'}
              icon={<GiftIcon color={theme.colors.gray_1} size={24} />}
              withChevron={true}
              renderContent={renderSectionContent}
            />
            <StyledText
              size={'l'}
              family={'bold'}
              style={{ color: theme.colors.gray_9, marginTop: 24 }}
            >
              Программа тура
            </StyledText>
            <FlatListWithTabs
              containerStyle={{ marginTop: 16 }}
              data={['День 1', 'День 2', 'День 3', 'День 4', 'День 5', 'День 6']}
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
      <StyledButton
        containerStyle={styles.buttonContainer}
        title={`Купить от ${formatSum(Number(tour.price))}`}
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export { AboutTourScreen }
