import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const MobileIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      opacity="0.4"
      d="M16.24 2H7.76C5 2 4 3 4 5.81V18.19C4 21 5 22 7.76 22H16.23C19 22 20 21 20 18.19V5.81C20 3 19 2 16.24 2Z"
      fill={color || '#8F9BB3'}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 6.25H14C14.41 6.25 14.75 5.91 14.75 5.5C14.75 5.09 14.41 4.75 14 4.75H10C9.59 4.75 9.25 5.09 9.25 5.5C9.25 5.91 9.59 6.25 10 6.25ZM13.75 17.5498C13.75 18.5163 12.9665 19.2998 12 19.2998C11.0335 19.2998 10.25 18.5163 10.25 17.5498C10.25 16.5833 11.0335 15.7998 12 15.7998C12.9665 15.7998 13.75 16.5833 13.75 17.5498Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { MobileIcon }
