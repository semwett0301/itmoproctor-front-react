import { TagPropStatus } from '../components/shared/Filter/ExamStatusCombobox/StatusTag/StatusTag'
import {
  customBadgePropStatus,
  CustomBadgePropStatus
} from '../components/shared/SharedTable/StatusBadge/StatusBadge'

export const defineStatus = (status: Omit<TagPropStatus, CustomBadgePropStatus>): string | null => {
  if (status === 'exceptPlanned') {
    return customBadgePropStatus.reduce((accumulator, value, index) => {
      return accumulator + '&' + index
    }, '')
  }

  if (status === 'interrupted') {
    return null
  }
  return null
}
