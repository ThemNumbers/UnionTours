import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '../../theme'
import { StyledText } from './StyledText'

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    paddingHorizontal: 16,
  },
})

interface Props {
  title: string
  isSelected: boolean
  onPress: () => void
}

const StyledTag: React.FC<Props> = ({ title, isSelected, onPress }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: isSelected ? theme.colors.gray_1 : 'transparent' },
      ]}
    >
      <StyledText
        size={'xs'}
        family={'semibold'}
        numberOfLines={2}
        style={{ color: isSelected ? theme.colors.blue_6 : theme.colors.gray_7 }}
      >
        {title}
      </StyledText>
    </TouchableOpacity>
  )
}

export { StyledTag }
