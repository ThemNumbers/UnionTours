import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const GiftIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      opacity="0.4"
      d="M19.97 10V18C19.97 21 18.97 22 15.97 22H7.96997C4.96997 22 3.96997 21 3.96997 18V10H19.97Z"
      fill={color || '#FA8C16'}
    />
    <Path
      d="M21.5 7V8C21.5 9.1 20.97 10 19.5 10H4.5C2.97 10 2.5 9.1 2.5 8V7C2.5 5.9 2.97 5 4.5 5H19.5C20.97 5 21.5 5.9 21.5 7Z"
      fill={color || '#FA8C16'}
    />
    <Path
      opacity="0.4"
      d="M11.64 5.00141H6.12003C5.78003 4.63141 5.79003 4.06141 6.15003 3.70141L7.57003 2.28141C7.94003 1.91141 8.55003 1.91141 8.92003 2.28141L11.64 5.00141Z"
      fill={color || '#FA8C16'}
    />
    <Path
      opacity="0.4"
      d="M17.87 5.00141H12.35L15.07 2.28141C15.44 1.91141 16.05 1.91141 16.42 2.28141L17.84 3.70141C18.2 4.06141 18.21 4.63141 17.87 5.00141Z"
      fill={color || '#FA8C16'}
    />
    <Path
      opacity="0.6"
      d="M8.93994 10V15.14C8.93994 15.94 9.81994 16.41 10.4899 15.98L11.4299 15.36C11.7699 15.14 12.1999 15.14 12.5299 15.36L13.4199 15.96C14.0799 16.4 14.9699 15.93 14.9699 15.13V10H8.93994Z"
      fill={color || '#FA8C16'}
    />
  </Svg>
))

export { GiftIcon }
