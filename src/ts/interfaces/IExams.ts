import { IOrganization } from './IOrganization'
import { ICourse } from './ICourse'
import { IStudent } from './IStudent'
import { IInspector } from './IInspector'
import { IExpert } from './IExpert'

export interface IExam {
  _id: string
  examId: string
  organization: string
  course: ICourse
  assignment: string
  subject: string
  student: IStudent
  async: boolean
  duration: number
  leftDate: Date
  rightDate: Date
  beginDate: Date
  endDate: Date
  inspector: IInspector
  startDate?: Date
  inspectorConnected: boolean
  stopDate?: Date
  comment: string
  examCode: string
  expert: IExpert
  note: string
  resolution?: boolean
  resolutionDate?: Date
  inCheck?: boolean
  videoAvailable?: boolean
  reportReady?: boolean
}

export interface IExams {
  total: number
  rows: IExam[] | []
  organizations: IOrganization[] | []
}
