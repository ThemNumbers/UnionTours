import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const SendIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '16'} height={size || '16'} viewBox="0 0 16 16" fill="none" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.8592 1.15234C14.9986 1.29651 15.0385 1.51008 14.9603 1.69482L9.50987 14.5777C9.31517 15.0379 8.65723 15.021 8.48645 14.5513L6.60171 9.36827L1.40152 7.00455C0.957466 6.80271 0.976412 6.16561 1.43167 5.99051L14.3203 1.03333C14.5076 0.961319 14.7197 1.00817 14.8592 1.15234ZM7.57854 9.12839L9.03499 13.1336L13.0402 3.66669L7.57854 9.12839ZM12.4802 2.81247L2.7927 6.53845L6.89128 8.40143L12.4802 2.81247Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { SendIcon }
