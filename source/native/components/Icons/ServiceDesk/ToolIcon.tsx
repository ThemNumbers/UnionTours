import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from '../IIconProps'

const ToolIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M20.2809 5.73552C20.2738 5.72849 18.8488 7.13708 16.0129 9.96833L14.023 7.97849L18.2629 3.73864C16.0316 2.39567 13.1652 2.74021 11.3066 4.5988C10.5962 5.30885 10.0849 6.19323 9.82411 7.16323C9.56331 8.13323 9.56213 9.15476 9.8207 10.1254L9.86289 10.2824L3.21836 16.9246C3.07305 17.0699 3.07305 17.309 3.21836 17.4543L6.53242 20.7683C6.67773 20.9136 6.9168 20.9136 7.06211 20.7683L13.702 14.1285L13.859 14.1707C15.8207 14.6933 17.9277 14.1496 19.3902 12.6871C21.2512 10.8285 21.5957 7.96208 20.2809 5.73552Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { ToolIcon }
