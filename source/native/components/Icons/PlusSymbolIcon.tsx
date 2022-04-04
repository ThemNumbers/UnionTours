import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const PlusSymbolIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '15'} height={size || '15'} viewBox="0 0 15 15" fill="none" style={style}>
    <Path
      d="M0 7.5C0 8.32843 0.671573 9 1.5 9H13.5C14.3284 9 15 8.32843 15 7.5V7.5C15 6.67157 14.3284 6 13.5 6H1.5C0.671573 6 0 6.67157 0 7.5V7.5Z"
      fill={color || '#8F9CBC'}
    />
    <Path
      d="M0 7.5C0 8.32843 0.6296 9 1.40625 9H13.5938C14.3704 9 15 8.32843 15 7.5C15 6.67157 14.3704 6 13.5938 6H1.40625C0.6296 6 0 6.67157 0 7.5Z"
      fill={color || '#8F9CBC'}
    />
    <Path
      d="M7.5 0C6.67157 0 6 0.671573 6 1.5L6 13.5C6 14.3284 6.67157 15 7.5 15V15C8.32843 15 9 14.3284 9 13.5V1.5C9 0.671573 8.32843 0 7.5 0V0Z"
      fill={color || '#8F9CBC'}
    />
    <Path
      d="M7.5 0C6.67157 0 6 0.6296 6 1.40625L6 13.5938C6 14.3704 6.67157 15 7.5 15C8.32843 15 9 14.3704 9 13.5938V1.40625C9 0.6296 8.32843 0 7.5 0Z"
      fill={color || '#8F9CBC'}
    />
  </Svg>
))

export { PlusSymbolIcon }
