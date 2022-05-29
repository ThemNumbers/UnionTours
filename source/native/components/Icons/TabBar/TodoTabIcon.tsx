import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from '../IIconProps'

const TodoTabIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      opacity="0.4"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.70337 22C11.5834 22 12.3334 21.25 12.3334 19.38V17H9.95337C8.08337 17 7.33337 16.25 7.33337 14.37V12H4.95337C3.08337 12 2.33337 12.75 2.33337 14.63V19.38C2.33337 21.25 3.08337 22 4.95337 22H9.70337Z"
      fill={color || '#8F9BB3'}
    />
    <Path
      opacity="0.6"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7034 17C16.5834 17 17.3334 16.25 17.3334 14.37V12H14.9534C13.0834 12 12.3334 11.25 12.3334 9.37V7H9.95337C8.08337 7 7.33337 7.75 7.33337 9.62V14.37C7.33337 16.25 8.08337 17 9.95337 17H14.7034Z"
      fill={color || '#8F9BB3'}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.7034 12C21.5834 12 22.3334 11.25 22.3334 9.37V4.62C22.3334 2.75 21.5834 2 19.7034 2H14.9534C13.0834 2 12.3334 2.75 12.3334 4.62V9.37C12.3334 11.25 13.0834 12 14.9534 12H19.7034Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { TodoTabIcon }
