import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IIconProps } from '../IIconProps'

const MainTabIcon: React.FC<IIconProps> = React.memo(({ color, size, style }) => (
  <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM7.67109 16.4625C7.62422 16.4836 7.56797 16.4625 7.54688 16.4133C7.5375 16.3898 7.5375 16.3617 7.54688 16.3383L9.86016 11.0531L12.9562 14.1492L7.67109 16.4625V16.4625ZM16.4625 7.67109L14.1492 12.9562L11.0531 9.86016L16.3383 7.54688C16.3852 7.52578 16.4414 7.54688 16.4625 7.59609C16.4719 7.61953 16.4719 7.64531 16.4625 7.67109V7.67109Z"
      fill={color || '#1890FF'}
    />
  </Svg>
))

export { MainTabIcon }
