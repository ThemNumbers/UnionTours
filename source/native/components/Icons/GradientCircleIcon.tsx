import * as React from 'react'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const GradientCircleIcon: React.FC<IIconProps> = React.memo(({ color, size, style, points }) => (
  <Svg width={size || '48'} height={size || '48'} viewBox="0 0 48 48" fill="none" style={style}>
    <Defs>
      <LinearGradient
        id="grad"
        x1={points.x1}
        y1={points.x2}
        x2={points.x3}
        y2={points.x4}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0%" stopColor={color} stopOpacity="0" />
        <Stop offset="100%" stopColor={color} stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Circle cx="24" cy="24" r="24" fill="url(#grad)" />
  </Svg>
))

export { GradientCircleIcon }
