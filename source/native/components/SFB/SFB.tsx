import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { TouchableBounce } from '../TouchableBounce'
import { StyledText } from '../UIKit/StyledText'

export interface SFBReturnData {
  project: string
  username: string
  speed?: number
  support?: number
  usability?: number
  comment?: string
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    activeMarkBgColor: { backgroundColor: theme.colors.blue_6 },
    inActiveMarkBgColor: { backgroundColor: theme.colors.gray_3 },
    activeMarkTextColor: { color: theme.colors.gray_1 },
    inActiveMarkTextColor: { color: theme.colors.gray_8 },
    markListText: { color: theme.colors.gray_7, paddingHorizontal: 16, marginVertical: 8 },
    titleText: {
      color: theme.colors.gray_9,
      marginTop: 12,
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    marksWrapper: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginLeft: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    markContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
      marginBottom: 8,
      borderRadius: 5,
    },
  })

  return styles
}
interface MarkListItem {
  title: string
  value?: number
  setMark: React.Dispatch<React.SetStateAction<number | undefined>>
}

interface Props {
  project: string
  username: string
  renderButtons: (
    data: SFBReturnData,
    isDisabled: boolean,
    requireComment: boolean
  ) => React.ReactNode
}

const SFBView: React.FC<Props> = ({ project, username, renderButtons }) => {
  const [speed, setSpeed] = useState<number | undefined>(undefined)
  const [usability, setUsability] = useState<number | undefined>(undefined)
  const [support, setSupport] = useState<number | undefined>(undefined)
  const { styles } = useThemeStyles(createStyles)
  const { width } = useWindowDimensions()
  const speedIsGood = speed && speed > 5
  const usabilityIsGood = usability && usability > 5
  const supportIsGood = support && support > 5
  const marksIsGood = speedIsGood && usabilityIsGood && supportIsGood
  const isDisabled =
    speed !== undefined && support !== undefined && usability !== undefined ? false : true
  const requireComment = !isDisabled && !marksIsGood ? true : false
  const GAP = 8 * 6 + 32
  const markContainerSizeStyle = { width: (width - GAP) / 7, height: (width - GAP) / 7 }

  const marksArray: Array<MarkListItem> = [
    { title: 'Скорость работы', value: speed, setMark: setSpeed },
    { title: 'Удобство работы', value: usability, setMark: setUsability },
    { title: 'Качество технической поддержки', value: support, setMark: setSupport },
  ]

  const renderMarkItem = (mark: number, index: number, markList: MarkListItem) => {
    const isSelected = markList.value !== undefined && mark <= markList.value ? true : false
    const markContainerStyle = isSelected ? styles.activeMarkBgColor : styles.inActiveMarkBgColor

    return (
      <TouchableBounce key={`mark-${index}`} onPress={() => markList.setMark(mark)}>
        <View style={[styles.markContainer, markContainerStyle, markContainerSizeStyle]}>
          <StyledText
            size={'m'}
            family={'semibold'}
            style={isSelected ? styles.activeMarkTextColor : styles.inActiveMarkTextColor}
          >
            {mark}
          </StyledText>
        </View>
      </TouchableBounce>
    )
  }

  const renderMarkListItem = (list: MarkListItem, listIdx: number) => (
    <View key={`markList-${listIdx}`}>
      <StyledText size={'xs'} family={'semibold'} style={styles.markListText}>
        {list.title}
      </StyledText>
      <View style={styles.marksWrapper}>
        {Array.from(Array(11).keys()).map((mark, markIdx) => renderMarkItem(mark, markIdx, list))}
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <StyledText size={'m'} family={'semibold'} style={styles.titleText}>
            Пожалуйста, оцените работу приложения
          </StyledText>
          {marksArray.map(renderMarkListItem)}
        </ScrollView>
      </View>
      {renderButtons({ project, username, speed, support, usability }, isDisabled, requireComment)}
    </View>
  )
}

export { SFBView }
