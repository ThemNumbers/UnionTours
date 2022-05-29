import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from '../IIconProps'

const Grid7Icon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22.75H9C3.57 22.75 1.25 20.43 1.25 15V10V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V10V15C22.75 20.43 20.43 22.75 15 22.75H12ZM11.25 21.25H9C4.39 21.25 2.75 19.61 2.75 15V10.75H11.25V21.25ZM12.75 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10.75H12.75V21.25ZM12 9.25H2.75V9C2.75 4.39 4.39 2.75 9 2.75H15C19.61 2.75 21.25 4.39 21.25 9V9.25H12Z"
      fill={color || '#8F9BB3'}
    />
  </Svg>
))

export { Grid7Icon }
