import { DefaultItem } from '@consta/uikit/Combobox'

export const verificationsList = ['workplace', 'face', 'document'] as const
export type VerificationType = typeof verificationsList[number]

export interface IVerificationItem extends DefaultItem {
  label: string
  id: VerificationType
  groupId?: string | number
  disabled?: boolean
}

export const verificationItems: IVerificationItem[] = [
  {
    label: 'Рабочее место',
    id: 'workplace'
  },
  {
    label: 'Фотография',
    id: 'face'
  },
  {
    label: 'Снимок документа',
    id: 'document'
  }
]

export type VerificationsItemsType = typeof verificationItems[number]
