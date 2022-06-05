import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const LocationIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M12.2727 12.8183C13.779 12.8183 15 11.5973 15 10.091C15 8.58481 13.779 7.36377 12.2727 7.36377C10.7665 7.36377 9.54546 8.58481 9.54546 10.091C9.54546 11.5973 10.7665 12.8183 12.2727 12.8183Z"
      stroke={color || '#1890FF'}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2727 2.81824C10.3439 2.81824 8.49403 3.58447 7.13013 4.94837C5.76623 6.31227 5 8.16212 5 10.091C5 11.811 5.36545 12.9364 6.36364 14.1819L12.2727 21.0001L18.1818 14.1819C19.18 12.9364 19.5455 11.811 19.5455 10.091C19.5455 8.16212 18.7792 6.31227 17.4153 4.94837C16.0514 3.58447 14.2016 2.81824 12.2727 2.81824V2.81824Z"
      stroke={color || '#1890FF'}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
))

export { LocationIcon }
