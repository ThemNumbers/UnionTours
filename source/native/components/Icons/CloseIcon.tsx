import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const CloseIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M16.7731 8.28752L8.28786 16.7728C7.99795 17.0627 7.51711 17.0627 7.2272 16.7728C6.93729 16.4829 6.93729 16.0021 7.2272 15.7121L15.7125 7.22686C16.0024 6.93694 16.4832 6.93694 16.7731 7.22686C17.0631 7.51677 17.0631 7.9976 16.7731 8.28752Z"
      fill={color || '#8F9BB3'}
    />
    <Path
      d="M16.7731 16.7728C16.4832 17.0627 16.0024 17.0627 15.7125 16.7728L7.2272 8.28752C6.93729 7.9976 6.93729 7.51677 7.2272 7.22686C7.51711 6.93694 7.99795 6.93694 8.28786 7.22686L16.7731 15.7121C17.0631 16.0021 17.0631 16.4829 16.7731 16.7728Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { CloseIcon }
