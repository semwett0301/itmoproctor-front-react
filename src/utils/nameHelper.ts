import { IInspector } from '../ts/interfaces/IInspector'
import { IExpert } from '../ts/interfaces/IExpert'
import { IStudent } from '../ts/interfaces/IStudent'

export const getFullName = (...args: string[]): string => {
  return args.join(' ')
}

export const getStudentName = (student: IStudent): string => {
  return [student.lastname, student.firstname, student.lastname].join(' ')
}

export const getShortName = (
  firstname?: string,
  secondName?: string,
  lastName?: string
): string => {
  return [
    lastName || null,
    firstname ? firstname[0] + '.' : null,
    secondName ? secondName[0] + '.' : null
  ].join(' ')
}

export type proctor = { exists: boolean; fullName: string; shortName: string; id: string }
export const getProctor = (
  async: boolean,
  inspector: IInspector | undefined | null,
  expert: IExpert | undefined | null
): proctor => {
  const r: proctor = { fullName: 'Не назначен', shortName: 'Не назначен', exists: false, id: '' }
  if (inspector || expert) {
    if (async && expert) {
      r.exists = true
      r.shortName = getShortName(expert.firstname, expert.middlename, expert.lastname)
      r.fullName = getFullName(expert.lastname, expert.firstname, expert.middlename)
      r.id = expert._id
    } else if (!async && inspector) {
      r.exists = true
      r.shortName = getShortName(inspector.firstname, inspector.middlename, inspector.lastname)
      r.fullName = getFullName(inspector.lastname, inspector.firstname, inspector.middlename)
      r.id = inspector._id
    }
  }
  return r
}
