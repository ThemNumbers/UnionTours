import {
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native'

export interface ICenterOn {
  x: number
  y: number
  scale: number
  duration: number
}

export interface IOnMove {
  type: string
  positionX: number
  positionY: number
  scale: number
  zoomCurrentDistance: number
}

export interface IOnClick {
  locationX: number
  locationY: number
  pageX: number
  pageY: number
}

export class ImageZoomProps {
  public cropWidth: number = 100
  public cropHeight: number = 100
  public imageWidth: number = 100
  public imageHeight: number = 100
  public panToMove?: boolean = true
  public pinchToZoom?: boolean = true
  public enableDoubleClickZoom?: boolean = true
  public clickDistance?: number = 10
  public maxOverflow?: number = 100
  public longPressTime?: number = 800
  public doubleClickInterval?: number = 175
  public centerOn?: ICenterOn
  public style?: ViewStyle = {}
  public swipeDownThreshold?: number = 230
  public enableSwipeDown?: boolean = false
  public enableCenterFocus?: boolean = true
  public useHardwareTextureAndroid?: boolean = true
  public minScale?: number = 0.6
  public maxScale?: number = 10
  public useNativeDriver?: boolean = false
  public onClick?: (eventParams: IOnClick) => void = () => {
    //
  }
  public onDoubleClick?: (eventParams: IOnClick) => void = () => {
    //
  }
  public onLongPress?: (eventParams: IOnClick) => void = () => {
    //
  }
  public horizontalOuterRangeOffset?: (offsetX: number) => void = () => {
    //
  }
  public onDragLeft?: () => void = () => {
    //
  }
  public responderRelease?: (vx: number, scale: number) => void = () => {
    //
  }
  public onMove?: (position: IOnMove) => void = () => {
    //
  }
  public layoutChange?: (event: LayoutChangeEvent) => void = () => {
    //
  }
  public onSwipeDown?: () => void = () => {
    //
  }
  public onMoveShouldSetPanResponder?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => boolean
  public onStartShouldSetPanResponder?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => boolean = () => true
  public onPanResponderTerminationRequest?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => boolean = () => false
}

export class ImageZoomState {
  public centerX?: number = 0.5
  public centerY?: number = 0.5
}
