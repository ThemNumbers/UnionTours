import { RouteProp, useFocusEffect } from '@react-navigation/core'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { HomeStackParamsList } from '../../../navigation/Home/HomeStack'
import { Routes } from '../../../navigation/routes'
import { StyledText } from '../../../components/UIKit/StyledText'
import { StyledButton } from '../../../components/UIKit/StyledButton'
import { capitalizeFirstLetter } from '../../../utils/textHelper'
import { HeartOutlinedIcon } from '../../../components/Icons/HeartOutlinedIcon'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { backgroundColor: theme.colors.gray_1, flex: 1 },
    titleText: { marginTop: 34, marginHorizontal: 24, color: theme.colors.gray_9 },
    buttonSpace: { height: 24 },
    descText: { color: theme.colors.gray_9, marginTop: 24, marginHorizontal: 24 },
    buttonContainer: { marginHorizontal: 16, marginBottom: 24 },
  })

  return styles
}

interface Props {
  route: RouteProp<HomeStackParamsList, Routes.AboutTourScreen>
  navigation: StackProp<HomeStackParamsList, Routes.AboutTourScreen>
}

const AboutTourScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme, styles, changeBarStyle } = useThemeStyles(createStyles)
  const { tour } = route.params

  useFocusEffect(() => {
    changeBarStyle('top', { color: theme.colors.gray_1, style: 'dark-content' })

    return () => {
      changeBarStyle('top')
    }
  })

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StyledText size={'xxl'} family={'bold'} style={styles.titleText}>
          C днём рождения, {capitalizeFirstLetter(tour.id)}!
        </StyledText>

        <StyledText size={'m'} family={'medium'} style={styles.descText}>
          От лица всей нашей компании мы поздравляем тебя с днём рождения!
        </StyledText>

        <StyledText size={'m'} family={'medium'} style={styles.descText}>
          Желаем тебе получать удовольствие от работы, новых успехов и побед в достижении
          амбициозных целей, реализации всех планов и задумок...
        </StyledText>

        <View style={styles.buttonSpace} />
      </ScrollView>
      <StyledButton
        containerStyle={styles.buttonContainer}
        renderIcon={(color) => <HeartOutlinedIcon size={24} color={color} />}
        title={'Спасибо'}
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export { AboutTourScreen }
