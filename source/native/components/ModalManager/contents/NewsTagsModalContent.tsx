import React, { useState } from 'react'
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NewsTag } from '../../../../framework/redux/interfaces/News'
import { Theme, useThemeStyles } from '../../../theme'
import { TouchableBounce } from '../../TouchableBounce'
import { StyledButton } from '../../UIKit/StyledButton'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: theme.colors.gray_1,
    },
    thumb: {
      width: 48,
      height: 4,
      alignSelf: 'center',
      marginTop: 8,
      borderRadius: 23,
      opacity: 0.5,
      backgroundColor: theme.colors.gray_9,
    },
    titleText: { paddingHorizontal: 16, marginTop: 40, color: theme.colors.gray_9 },
    tagsWrapper: { marginTop: 32, paddingHorizontal: 16 },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginRight: 32 },
    acceptBtnContainer: { marginTop: 40, marginHorizontal: 16 },
    cancelBtnContainer: { marginTop: 16, marginHorizontal: 16 },
    tagWrapper: { padding: 8, borderRadius: 24, marginRight: 8, marginBottom: 8 },
  })

  return styles
}

interface Props {
  title: string
  tags: Array<NewsTag>
  initialTags: Array<string>
  onApply: (tags: Array<string>) => void
  onDrop: () => void
  hideModal: () => void
}

const NewsTagsModalContent: React.FC<Props> = ({
  title,
  tags,
  initialTags,
  onApply,
  onDrop,
  hideModal,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)
  const { height } = useWindowDimensions()
  const CONTENT_HEIGHT = 284
  const insets = useSafeAreaInsets()
  const freeSpace = height - CONTENT_HEIGHT - insets.top
  const numOfColumns = Math.round(freeSpace / 40)
  const widthList = numOfColumns === 1 ? 3900 : numOfColumns === 2 ? 2000 : 1000

  const onTagPress = (tag: string) => {
    const alreadyExist = selectedTags.find((t) => t === tag)
    if (alreadyExist) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const renderTagItem = (tag: NewsTag, index: number) => {
    const isSelected = selectedTags.includes(tag.originalTitle)
    return (
      <TouchableBounce
        onPress={() => onTagPress(tag.originalTitle)}
        key={index}
        style={[
          styles.tagWrapper,
          { backgroundColor: isSelected ? theme.colors.cyan_6 : theme.colors.gray_3 },
        ]}
      >
        <StyledText
          size={'m'}
          family={'semibold'}
          style={{ color: isSelected ? theme.colors.gray_1 : theme.colors.gray_8 }}
        >
          {tag.correctTitle}
        </StyledText>
      </TouchableBounce>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.thumb} />
      <StyledText size={'xl'} family={'bold'} style={styles.titleText}>
        {title}
      </StyledText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsWrapper}>
        <View style={[styles.tagContainer, { width: widthList }]}>{tags.map(renderTagItem)}</View>
      </ScrollView>

      <StyledButton
        containerStyle={styles.acceptBtnContainer}
        title={'Применить фильтр'}
        disabled={selectedTags && selectedTags.length ? false : true}
        onPress={() => {
          onApply(selectedTags)
          hideModal()
        }}
      />
      <StyledButton
        title={'Сбросить все фильтры'}
        disabled={selectedTags && selectedTags.length ? false : true}
        onPress={() => {
          onDrop()
          hideModal()
        }}
        activeBgColor={theme.colors.gray_1}
        activeTextColor={theme.colors.cyan_6}
        containerStyle={[styles.cancelBtnContainer, { marginBottom: insets.bottom + 16 }]}
      />
    </View>
  )
}

export { NewsTagsModalContent }
