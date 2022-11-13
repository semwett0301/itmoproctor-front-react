import { IInspector } from '../ts/interfaces/IInspector'
import { IExpert } from '../ts/interfaces/IExpert'

export const getFullName = (...args: string[]): string => {
  return args.join(' ')
}

export const getShortName = (
  firstname?: string,
  secondName?: string,
  lastName?: string
): string => {
  return [
    lastName || null,
    secondName ? secondName[0] : null,
    firstname ? firstname[0] : null
  ].join(' ')
}

export const getProctorName = (
  async: boolean,
  inspector: IInspector | undefined,
  expert: IExpert | undefined
): { fullName: string; shortName: string } => {
  const r = { fullName: 'Не назначен', shortName: 'Не назначен' }
  if (inspector || expert) {
    if (async && expert) {
      r.shortName = getShortName(expert.lastname, expert.firstname, expert.middlename)
      r.fullName = getFullName(expert.lastname, expert.firstname, expert.middlename)
    } else if (!async && inspector) {
      r.shortName = getShortName(inspector.lastname, inspector.firstname, inspector.middlename)
      r.fullName = getFullName(inspector.lastname, inspector.firstname, inspector.middlename)
    }
  }
  return r
}
