import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const ChevronDownIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9998 15.5002C11.7438 15.5002 11.4878 15.4023 11.2928 15.2073L7.29276 11.2072C6.90176 10.8162 6.90176 10.1842 7.29276 9.79325C7.68376 9.40225 8.31576 9.40225 8.70676 9.79325L12.0118 13.0982L15.3048 9.91825C15.7038 9.53525 16.3348 9.54625 16.7188 9.94325C17.1028 10.3403 17.0918 10.9742 16.6948 11.3572L12.6948 15.2193C12.4998 15.4073 12.2498 15.5002 11.9998 15.5002Z"
      fill={color || '#8F9BB3'}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9998 15.5002C11.7438 15.5002 11.4878 15.4023 11.2928 15.2073L7.29276 11.2072C6.90176 10.8162 6.90176 10.1842 7.29276 9.79325C7.68376 9.40225 8.31576 9.40225 8.70676 9.79325L12.0118 13.0982L15.3048 9.91825C15.7038 9.53525 16.3348 9.54625 16.7188 9.94325C17.1028 10.3403 17.0918 10.9742 16.6948 11.3572L12.6948 15.2193C12.4998 15.4073 12.2498 15.5002 11.9998 15.5002Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { ChevronDownIcon }
