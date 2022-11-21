import { IOrganization } from './IOrganizations'
import { IStudent } from './IStudent'
import { IInspector } from './IInspector'
import { IExpert } from './IExpert'
import { ICourse } from './ICourse'

export type IVerified = {
  _id: string
  submit: boolean
  hash: string
}

export interface IExam {
  _id: string
  examId: string
  organization: IOrganization
  course: ICourse | null
  assignment: string
  subject: string
  student: IStudent
  inspector: IInspector
  expert: IExpert | null
  async?: boolean
  verifications: string[] | null
  platformURL: string
  duration: number
  leftDate: string
  rightDate: string
  beginDate: string
  endDate: string
  startDate: string
  stopDate: string
  planDate: string
  verified: IVerified
  resolution: boolean
  comment: string
  report: string
  info: string
  note: string
  resolutionDate: string
}
