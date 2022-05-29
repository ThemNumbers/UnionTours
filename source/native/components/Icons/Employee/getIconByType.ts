import React from 'react'
import { EmployeeInfoIconType } from '../../../../framework/redux/interfaces/Profile'
import { DocumentTextIcon } from './DocumentTextIcon'
import { IIconProps } from '../IIconProps'
import { CopyIcon } from './CopyIcon'
import { FormatCircleIcon } from './FormatCircleIcon'
import { Grid7Icon } from './Grid7Icon'
import { RowVerticalIcon } from './RowVerticalIcon'
import { TaskSquareIcon } from './TaskSquareIcon'

export const getIconByType = (type: EmployeeInfoIconType): React.FC<IIconProps> => {
  switch (type) {
    case EmployeeInfoIconType.DOCUMENT_TEXT:
      return DocumentTextIcon
    case EmployeeInfoIconType.COPY:
      return CopyIcon
    case EmployeeInfoIconType.FORMAT_CIRCLE:
      return FormatCircleIcon
    case EmployeeInfoIconType.GRID_7:
      return Grid7Icon
    case EmployeeInfoIconType.ROW_VERTICAL:
      return RowVerticalIcon
    case EmployeeInfoIconType.TASK_SQUARE:
      return TaskSquareIcon
  }
}
