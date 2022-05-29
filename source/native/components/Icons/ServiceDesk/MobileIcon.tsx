import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from '../IIconProps'

const MobileIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M17.4375 1.45312H6.5625C5.73516 1.45312 5.0625 2.12578 5.0625 2.95312V20.9531C5.0625 21.7805 5.73516 22.4531 6.5625 22.4531H17.4375C18.2648 22.4531 18.9375 21.7805 18.9375 20.9531V2.95312C18.9375 2.12578 18.2648 1.45312 17.4375 1.45312ZM12 19.3125C11.482 19.3125 11.0625 18.893 11.0625 18.375C11.0625 17.857 11.482 17.4375 12 17.4375C12.518 17.4375 12.9375 17.857 12.9375 18.375C12.9375 18.893 12.518 19.3125 12 19.3125Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { MobileIcon }
