import * as React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { StyledSection, StyledSectionProps } from '../UIKit/StyledSection'
interface Props {
  sectionsArray: StyledSectionProps[]
  style?: StyleProp<ViewStyle>
}

const SectionsBlockArray: React.FC<Props> = ({ sectionsArray, style }) => (
  <View style={style}>
    {sectionsArray.map((item, index) => (
      <StyledSection key={index} {...item} />
    ))}
  </View>
)

export { SectionsBlockArray }
