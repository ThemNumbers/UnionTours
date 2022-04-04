import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './IIconProps'

const BackArrowIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 10.9999H7.135L10.768 6.63991C11.122 6.21591 11.064 5.58491 10.64 5.23191C10.215 4.87791 9.585 4.93591 9.232 5.35991L4.232 11.3599C4.193 11.4069 4.173 11.4619 4.144 11.5139C4.12 11.5559 4.091 11.5919 4.073 11.6379C4.028 11.7529 4.001 11.8739 4.001 11.9959C4.001 11.9969 4 11.9989 4 11.9999C4 12.0009 4.001 12.0029 4.001 12.0039C4.001 12.1259 4.028 12.2469 4.073 12.3619C4.091 12.4079 4.12 12.4439 4.144 12.4859C4.173 12.5379 4.193 12.5929 4.232 12.6399L9.232 18.6399C9.43 18.8769 9.714 18.9999 10 18.9999C10.226 18.9999 10.453 18.9239 10.64 18.7679C11.064 18.4149 11.122 17.7839 10.768 17.3599L7.135 12.9999H19C19.552 12.9999 20 12.5519 20 11.9999C20 11.4479 19.552 10.9999 19 10.9999Z"
      fill={color || '#8F9BB3'}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 10.9999H7.135L10.768 6.63991C11.122 6.21591 11.064 5.58491 10.64 5.23191C10.215 4.87791 9.585 4.93591 9.232 5.35991L4.232 11.3599C4.193 11.4069 4.173 11.4619 4.144 11.5139C4.12 11.5559 4.091 11.5919 4.073 11.6379C4.028 11.7529 4.001 11.8739 4.001 11.9959C4.001 11.9969 4 11.9989 4 11.9999C4 12.0009 4.001 12.0029 4.001 12.0039C4.001 12.1259 4.028 12.2469 4.073 12.3619C4.091 12.4079 4.12 12.4439 4.144 12.4859C4.173 12.5379 4.193 12.5929 4.232 12.6399L9.232 18.6399C9.43 18.8769 9.714 18.9999 10 18.9999C10.226 18.9999 10.453 18.9239 10.64 18.7679C11.064 18.4149 11.122 17.7839 10.768 17.3599L7.135 12.9999H19C19.552 12.9999 20 12.5519 20 11.9999C20 11.4479 19.552 10.9999 19 10.9999Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { BackArrowIcon }