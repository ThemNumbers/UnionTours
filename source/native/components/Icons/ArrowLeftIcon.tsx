import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const ArrowLeftIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M14.9993 20.6695C14.8093 20.6695 14.6193 20.5995 14.4693 20.4495L7.9493 13.9295C6.8893 12.8695 6.8893 11.1295 7.9493 10.0695L14.4693 3.54953C14.7593 3.25953 15.2393 3.25953 15.5293 3.54953C15.8193 3.83953 15.8193 4.31953 15.5293 4.60953L9.0093 11.1295C8.5293 11.6095 8.5293 12.3895 9.0093 12.8695L15.5293 19.3895C15.8193 19.6795 15.8193 20.1595 15.5293 20.4495C15.3793 20.5895 15.1893 20.6695 14.9993 20.6695Z"
      fill={color || '#414858'}
    />
  </Svg>
))

export { ArrowLeftIcon }
