import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const CircleEmptyIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '97'} height={size || '96'} viewBox="0 0 97 96" fill="none" style={style}>
    <Rect x="0.5" width="96" height="96" rx="48" fill="url(#paint0_linear_484_17453)" />
    <Path
      opacity="0.4"
      d="M67.4167 40.8749V55.1248C67.4167 57.4582 66.1667 59.6249 64.1458 60.8124L51.7708 67.9582C49.75 69.1249 47.25 69.1249 45.2083 67.9582L32.8333 60.8124C30.8125 59.6458 29.5625 57.479 29.5625 55.1248V40.8749C29.5625 38.5416 30.8125 36.3748 32.8333 35.1873L45.2083 28.0415C47.2292 26.8748 49.7292 26.8748 51.7708 28.0415L64.1458 35.1873C66.1667 36.3748 67.4167 38.5207 67.4167 40.8749Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53.3542 43.1456C53.3542 45.8265 51.1809 47.9998 48.5 47.9998C45.8191 47.9998 43.6459 45.8265 43.6459 43.1456C43.6459 40.4647 45.8191 38.2915 48.5 38.2915C51.1809 38.2915 53.3542 40.4647 53.3542 43.1456ZM55.8125 54.4364C56.75 55.8323 55.7708 57.7072 54.0833 57.7072H42.9167C41.2292 57.7072 40.25 55.8323 41.1875 54.4364C42.6042 52.3323 45.3542 50.9156 48.5 50.9156C51.6458 50.9156 54.3958 52.3323 55.8125 54.4364Z"
      fill={color}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_484_17453"
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

export { CircleEmptyIcon }
