import { IOrganization } from './IOrganizations'
import { IStudent } from './IStudent'
import { IInspector } from './IInspector'
import { IExpert } from './IExpert'
import { ICourse } from './ICourse'

export interface IExam {
  _id: string
  assignment: string
  examId: string
  organization: IOrganization
  course: ICourse | null
  subject: string
  student: IStudent
  inspector: IInspector
  expert: IExpert | null
  async: boolean
  verifications: [] | null
  duration: number
  leftDate: string
  rightDate: string
  beginDate: string
  endDate: string
  resolution: boolean
  comment: string
}
