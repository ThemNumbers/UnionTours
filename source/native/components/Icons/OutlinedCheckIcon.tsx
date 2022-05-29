import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const OutlinedCheckIcon: React.FC<IIconProps> = React.memo(({ color, width, height, style }) => (
  <Svg width={width || '24'} height={height || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.0358 7.47517C20.3256 7.77106 20.3207 8.24591 20.0248 8.53577L10.8373 17.5358C10.5457 17.8214 10.0793 17.8214 9.78766 17.5358L4.97517 12.8215C4.67927 12.5316 4.67437 12.0568 4.96423 11.7609C5.25409 11.465 5.72894 11.4601 6.02484 11.7499L10.3125 15.9501L18.9752 7.46423C19.2711 7.17437 19.7459 7.17927 20.0358 7.47517Z"
      fill={color || '#414858'}
    />
  </Svg>
))

export { OutlinedCheckIcon }
