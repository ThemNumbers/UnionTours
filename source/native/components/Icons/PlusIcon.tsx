import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const PlusIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '12'} height={size || '12'} viewBox="0 0 12 12" fill="none" style={style}>
    <Path
      d="M5.64844 1.78125H6.35156C6.41406 1.78125 6.44531 1.8125 6.44531 1.875V10.125C6.44531 10.1875 6.41406 10.2188 6.35156 10.2188H5.64844C5.58594 10.2188 5.55469 10.1875 5.55469 10.125V1.875C5.55469 1.8125 5.58594 1.78125 5.64844 1.78125Z"
      fill={color || 'white'}
    />
    <Path
      d="M2.0625 5.55469H9.9375C10 5.55469 10.0312 5.58594 10.0312 5.64844V6.35156C10.0312 6.41406 10 6.44531 9.9375 6.44531H2.0625C2 6.44531 1.96875 6.41406 1.96875 6.35156V5.64844C1.96875 5.58594 2 5.55469 2.0625 5.55469Z"
      fill={color || 'white'}
    />
  </Svg>
))

export { PlusIcon }
