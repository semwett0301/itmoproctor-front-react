import { StatusComboboxItem } from '../components/shared/Filter/ExamStatusCombobox/ExamStatusCombobox'
import { IOrganization, IOrganizations } from '../ts/interfaces/IOrganizations'

export const statusFormat = (statuses: StatusComboboxItem[] | null): string | null =>
  statuses
    ? statuses
        .filter((item) => item.groupId !== 2)
        .map((item) => {
          if (item.getStatus) {
            return item.getStatus
          }
        })
        .join(',')
    : null

export const resetFormat = (statuses: StatusComboboxItem[] | null): boolean | null => {
  const arr = statuses
    ? statuses
        .filter((item) => item.groupId === 2)
        .map((item) => {
          if (item.getStatus) {
            return item.getStatus
          }
        })
    : null

  if (arr && arr.length === 1) return !!arr[0]
  else return null
}

export const organizationsFormat = (organizations: IOrganization[] | null): string | null =>
  organizations ? organizations.map((item) => item._id).join(',') : null
