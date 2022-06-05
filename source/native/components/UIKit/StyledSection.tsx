import React, { useCallback, useEffect, useState } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { ChevronDownIcon } from '../Icons/ChevronDownIcon'
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'
import { StyledTextButton } from './StyledTextButton'
import { StyledText } from './StyledText'
import { StyledCircleIndicator } from './StyledCircleIndicator'
import { CloseIcon } from '../Icons/CloseIcon'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { marginBottom: 16, flex: 1, borderRadius: 8, backgroundColor: theme.colors.gray_1 },
    title: { color: theme.colors.gray_8 },
    description: { color: theme.colors.gray_7 },
    sectionContainer: { alignItems: 'center', padding: 16, flexDirection: 'row' },
    sectionContentWrapper: { marginLeft: 16, flex: 1 },
    contentContainer: { overflow: 'hidden' },
    contentOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
    contentBtnContainer: { paddingTop: 8, paddingBottom: 25 },
    sectionIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  return styles
}

export interface StyledSectionProps {
  icon: React.ReactNode
  title: string
  isDisabled?: boolean
  isLoading?: boolean
  isFailed?: boolean
  description?: string
  withChevron?: boolean
  initialExpanded?: boolean
  expandable?: boolean
  containerStyle?: StyleProp<ViewStyle>
  renderContent?: (isExpanded: boolean) => React.ReactNode
  onPress?: () => void
}

const StyledSection: React.FC<StyledSectionProps> = ({
  icon,
  title,
  description,
  isDisabled,
  isLoading,
  isFailed,
  withChevron,
  initialExpanded,
  expandable,
  containerStyle,
  renderContent,
  onPress,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const [isExpanded, setIsExpanded] = useState(initialExpanded || false)
  const animHeight = useSharedValue(0)
  const animChevron = useSharedValue(initialExpanded ? 1 : 0)
  const [contentIsOpened, setContentIsOpened] = useState(initialExpanded || false)
  const [heightBlock, setHeightBlock] = useState(0)
  const animToValue = contentIsOpened ? 0 : heightBlock
  const btnIsDisabled = isDisabled || isFailed || isLoading
  const showChevronDown = withChevron && !btnIsDisabled

  const runAnimation = useCallback(
    (expand?: boolean) => {
      animHeight.value = withTiming(expand ? heightBlock : animToValue, { duration: 250 })
      if (!expand) {
        animChevron.value = withTiming(contentIsOpened ? 0 : 1, { duration: 250 })
        setContentIsOpened(!contentIsOpened)
      }
    },
    [animHeight, contentIsOpened, animToValue, heightBlock, animChevron]
  )

  useEffect(() => {
    if (contentIsOpened) {
      runAnimation(true)
    }
  }, [isExpanded, contentIsOpened, runAnimation])

  const contentStyle = useAnimatedStyle(() => ({
    height: animHeight.value,
  }))

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(animChevron.value, [0, 1], [0, 180])}deg` }],
  }))

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        disabled={btnIsDisabled}
        onPress={() => (onPress ? onPress() : runAnimation())}
        style={styles.sectionContainer}
      >
        <View
          style={[
            styles.sectionIconContainer,
            { backgroundColor: isFailed ? theme.colors.red_4 : theme.colors.cyan_4 },
          ]}
        >
          {isLoading ? (
            <StyledCircleIndicator size={24} strokeColor={theme.colors.gray_1} />
          ) : isFailed ? (
            <CloseIcon size={24} color={theme.colors.gray_1} />
          ) : (
            icon
          )}
        </View>
        <View style={styles.sectionContentWrapper}>
          <StyledText size={'m'} family={'semibold'} style={styles.title}>
            {title}
          </StyledText>

          {description ? (
            <StyledText size={'xs'} family={'regular'} style={styles.description}>
              {description}
            </StyledText>
          ) : null}
        </View>
        {showChevronDown ? (
          <Animated.View style={chevronStyle}>
            <ChevronDownIcon color={theme.colors.gray_9} />
          </Animated.View>
        ) : null}
      </TouchableOpacity>
      {renderContent ? (
        <Animated.View
          style={[styles.contentContainer, contentStyle]}
          pointerEvents={contentIsOpened ? 'auto' : 'none'}
        >
          <View
            style={styles.contentOverlay}
            onLayout={(e) => setHeightBlock(e.nativeEvent.layout.height)}
          >
            {renderContent(isExpanded)}
            {expandable ? (
              <StyledTextButton
                title={isExpanded ? 'Свернуть' : 'Показать больше'}
                onPress={() => setIsExpanded(!isExpanded)}
                containerStyle={styles.contentBtnContainer}
              />
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </View>
  )
}

export { StyledSection }
