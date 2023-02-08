import {DefaultItem} from '@consta/uikit/Combobox'

export const verificationsList = ['workplace', 'face', 'document'] as const
export type VerificationType = typeof verificationsList[number]

export interface IVerificationItem extends DefaultItem {
  label: string
  id: VerificationType
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

export const fullVerificationsList = ['workplace', 'face', 'document'] as const
export type FullVerificationType = typeof fullVerificationsList[number]

export interface IFullVerificationItem {
  label: string
  id: FullVerificationType | null | []
}

export const fullVerificationItems: IFullVerificationItem[] = [
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
  },
  {
    label: 'Без верификаций',
    id: []
  },
  {
    label: 'Из курса',
    id: null
  }
]

export const verificationItemsObj: { [index: string]: IVerificationItem } = {
  workplace: {
    label: 'Рабочее место',
    id: 'workplace'
  },
  face: {
    label: 'Фотография',
    id: 'face'
  },
  document: {
    label: 'Снимок документа',
    id: 'document'
  }
}

export const getVerifications = (
  verifications: FullVerificationType[] | null
): IFullVerificationItem[] => {
  if (!verifications) return [fullVerificationItems[4]]
  if (verifications.length === 0) return [fullVerificationItems[3]]
  else {
    return verifications.map((value) => verificationItemsObj[value])
  }
}

export const getPostVerificstions = (verifiations: IFullVerificationItem[]): string[] | null => {
  if (verifiations.includes(fullVerificationItems[4])) {
    return null
  } else if (verifiations.includes(fullVerificationItems[3])) {
    return []
  } else {
    const log = verifiations.filter((i) => typeof i.id === 'string') as {
      id: string
      label: string
    }[]
    return log.map((i) => i.id)
  }
}

export type VerificationsItemsType = typeof verificationItems[number]
