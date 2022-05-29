import React from 'react'
import { TileIconType } from '../../../../framework/redux/interfaces/Jira'
import { IIconProps } from '../IIconProps'
import { PhoneIcon } from '../PhoneIcon'
import { CarIcon } from './CarIcon'
import { EditIcon } from './EditIcon'
import { ExclamationIcon } from './ExclamationIcon'
import { GiftIcon } from './GiftIcon'
import { HeadPhonesIcon } from './HeadPhonesIcon'
import { IdCardIcon } from './IdCardIcon'
import { InteractionIcon } from './InteractionIcon'
import { LightIcon } from './LightIcon'
import { MessageIcon } from './MessageIcon'
import { MobileIcon } from './MobileIcon'
import { PrinterIcon } from './PrinterIcon'
import { QuestionIcon } from './QuestionIcon'
import { SafetyIcon } from './SafetyIcon'
import { ServerIcon } from './ServerIcon'
import { ToolIcon } from './ToolIcon'
import { UnlockIcon } from './UnlockIcon'
import { UserIcon } from './UserIcon'

export const getIconByType = (type: TileIconType): React.FC<IIconProps> => {
  switch (type) {
    case TileIconType.CAR:
      return CarIcon
    case TileIconType.EDIT:
      return EditIcon
    case TileIconType.EXCLAMATION:
      return ExclamationIcon
    case TileIconType.GIFT:
      return GiftIcon
    case TileIconType.HEADPHONE:
      return HeadPhonesIcon
    case TileIconType.ID_CARD:
      return IdCardIcon
    case TileIconType.INTERACTION:
      return InteractionIcon
    case TileIconType.LIGHT:
      return LightIcon
    case TileIconType.LOCK:
      return UnlockIcon
    case TileIconType.MESSAGE:
      return MessageIcon
    case TileIconType.MOBILE:
      return MobileIcon
    case TileIconType.PHONE:
      return PhoneIcon
    case TileIconType.PRINTER:
      return PrinterIcon
    case TileIconType.QUESTION:
      return QuestionIcon
    case TileIconType.SAFETY:
      return SafetyIcon
    case TileIconType.SERVER:
      return ServerIcon
    case TileIconType.TOOL:
      return ToolIcon
    case TileIconType.USER:
      return UserIcon
  }
}
