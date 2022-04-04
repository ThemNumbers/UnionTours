import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const MinusSymbolIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '15'} height={size || '3'} viewBox="0 0 15 3" fill="none" style={style}>
    <Path
      d="M0 1.5C0 2.32843 0.671573 3 1.5 3H13.5C14.3284 3 15 2.32843 15 1.5V1.5C15 0.671573 14.3284 0 13.5 0H1.5C0.671573 0 0 0.671573 0 1.5V1.5Z"
      fill={color || '#8F9CBC'}
    />
    <Path
      d="M0 1.5C0 2.32843 0.6296 3 1.40625 3H13.5938C14.3704 3 15 2.32843 15 1.5C15 0.671573 14.3704 0 13.5938 0H1.40625C0.6296 0 0 0.671573 0 1.5Z"
      fill={color || '#8F9CBC'}
    />
  </Svg>
))

export { MinusSymbolIcon }
