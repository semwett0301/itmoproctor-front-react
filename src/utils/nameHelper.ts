import { IInspector } from '../ts/interfaces/IInspector'
import { IExpert } from '../ts/interfaces/IExpert'

export const getFullName = (firstname?: string, secondName?: string, lastName?: string): string => {
  console.log(secondName)
  return `${lastName} ${firstname} ${secondName}`
}

export const getShortName = (
  firstname?: string,
  secondName?: string,
  lastName?: string
): string => {
  return `${lastName} ${secondName ? secondName[0] : '?'}. ${firstname ? firstname[0] : '?'}. `
}

export const getProctorName = (
  async: boolean,
  inspector: IInspector | undefined,
  expert: IExpert | undefined
): string => {
  if (inspector || expert) {
    if (async && expert) {
      return getShortName(expert.lastname, expert.firstname, expert.middlename[0])
    } else if (!async && inspector) {
      return getShortName(inspector.lastname, inspector.firstname, inspector.middlename[0])
    }
  }
  return 'Не назначен'
}
