import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { HomeStackParamsList } from '../../../navigation/Home/HomeStack'
import { Routes } from '../../../navigation/routes'
import { StyledText } from '../../../components/UIKit/StyledText'
import { StyledButton } from '../../../components/UIKit/StyledButton'
import { HeartOutlinedIcon } from '../../../components/Icons/HeartOutlinedIcon'
import { DefaultHeader } from '../../../components/DefaultHeader'
import { MoonIcon } from '../../../components/Icons/MoonIcon'
import { TouchableBounce } from '../../../components/TouchableBounce'
import { CopyIcon } from '../../../components/Icons/Employee/CopyIcon'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    titleText: { color: theme.colors.gray_7 },
    buttonSpace: { height: 24 },
    tagText: { color: theme.colors.gray_8 },
    buttonContainer: { marginHorizontal: 16, marginBottom: 24 },
  })

  return styles
}

interface Props {
  route: RouteProp<HomeStackParamsList, Routes.SelectCategoriesScreen>
  navigation: StackProp<HomeStackParamsList, Routes.SelectCategoriesScreen>
}

const SelectCategoriesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme, styles, changeBarStyle } = useThemeStyles(createStyles)
  const { withBack } = route.params || {}
  const MAX_COUNT = 5
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])

  const onSwitchThemePress = () => {
    console.log('asd')
  }

  const tags = [
    'Вкусная еда',
    'Водный туризм',
    'Море',
    'Горы',
    'Сплавы',
    'Отдых с детьми',
    'Пеший туризм',
    'Аквапарки',
    'Песок',
    'Культура',
    'Все включено',
  ]

  const onTagPress = (tag: string) => {
    const alreadySelected = selectedTags.find((t) => t === tag)
    if (alreadySelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else if (selectedTags.length < MAX_COUNT) {
      setSelectedTags([...selectedTags, tag])
    } else {
      // show alert
    }
  }

  return (
    <View style={styles.container}>
      <DefaultHeader
        hideBackButton={!withBack}
        title={'Интересы'}
        rightActions={[{ icon: MoonIcon, onPress: onSwitchThemePress }]}
      />
      <ScrollView style={styles.container}>
        <View style={{ padding: 16 }}>
          <StyledText size={'m'} family={'regular'} style={styles.titleText}>
            Выберите, что вам нравится больше всего
          </StyledText>
          <View style={{ flexDirection: 'row', marginTop: 24, flexWrap: 'wrap' }}>
            {tags.map((tag, idx) => (
              <TouchableBounce
                key={idx}
                onPress={() => onTagPress(tag)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 40,
                  marginRight: 12,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: selectedTags.includes(tag)
                    ? theme.colors.cyan_4
                    : theme.colors.gray_5,
                  backgroundColor: selectedTags.includes(tag)
                    ? theme.colors.cyan_1
                    : theme.colors.gray_3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StyledText
                  size={'s'}
                  family={'semibold'}
                  style={{
                    color: selectedTags.includes(tag) ? theme.colors.cyan_7 : theme.colors.gray_7,
                  }}
                >
                  {tag}
                </StyledText>
              </TouchableBounce>
            ))}
          </View>
        </View>
        <View style={styles.buttonSpace} />
      </ScrollView>
      <StyledButton
        containerStyle={styles.buttonContainer}
        renderIcon={(color) => <CopyIcon size={24} color={color} />}
        title={`Сохранить ${selectedTags.length}/5`}
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export { SelectCategoriesScreen }
