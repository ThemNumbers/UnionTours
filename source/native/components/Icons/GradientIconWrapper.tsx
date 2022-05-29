import React from 'react'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const GradientIconWrapper: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '40'} height={size || '40'} viewBox="0 0 40 40" fill="none" style={style}>
    <Rect
      width={size || '40'}
      height={size || '40'}
      rx={size ? size / 2 : '20'}
      fill="url(#paint0_linear_30157_64390)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_30157_64390"
        x1="29"
        y1="2.5"
        x2="-3.5"
        y2="78"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={color || '#007BFB'} />
        <Stop offset="1" stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
))

export { GradientIconWrapper }
