import React from 'react'
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const CircleEmptyFavorite: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '97'} height={size || '96'} viewBox="0 0 97 96" fill="none" style={style}>
    <Rect x="0.5" width="96" height="96" rx="48" fill="url(#paint0_linear_30205_19266)" />
    <Path
      d="M52.0717 30.86L55.5758 37.9466C56.0559 38.9193 57.3319 39.8791 58.411 40.0484L64.83 41.14C68.9404 41.83 69.8661 44.8031 66.9048 47.7456L61.861 52.7292C61.0189 53.5645 60.5236 55.2065 60.7905 56.3601L62.1764 62.5472C63.2657 67.4318 60.6569 69.3228 56.3553 66.759L50.3462 63.1771C49.2519 62.5224 47.4632 62.5326 46.3751 63.1665L40.3211 66.7004C35.9874 69.2261 33.3983 67.3257 34.5568 62.4515L36.0368 56.2835C36.3132 55.1305 35.8624 53.4851 35.0282 52.6488L30.0508 47.6402C27.1306 44.6899 28.0968 41.7237 32.2094 41.0504L38.6308 40.0036C39.7149 39.818 41.0054 38.8915 41.49 37.9125L45.0943 30.8325C47.0335 27.0101 50.1803 27.0247 52.0717 30.86Z"
      fill={color || '#A5B0CB'}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_30205_19266"
        x1="18.061"
        y1="88.9756"
        x2="89.4756"
        y2="15.2195"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EAEDF5" />
        <Stop offset="1" stopColor="#EAEDF5" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
))

export { CircleEmptyFavorite }
