import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const CheckBoxIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '18'} height={size || '18'} viewBox="0 0 18 18" fill="none" style={style}>
    <Path
      d="M15 4.5L6.75 12.75L3 9"
      stroke={color || '#FFFFFF'}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
))

export { CheckBoxIcon }
