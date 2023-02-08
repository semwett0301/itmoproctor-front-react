import {ICourse} from './ICourse'
import {IStudent} from './IStudent'
import {IInspector} from './IInspector'
import {IExpert} from './IExpert'

export interface IExamRow {
  _id: string
  examId: string
  organization: string
  course: ICourse
  assignment: string
  subject: string
  student: IStudent
  async: boolean
  duration: number
  leftDate: string
  rightDate: string
  beginDate: string
  endDate: string
  inspector: IInspector
  startDate?: string
  inspectorConnected: boolean
  stopDate?: string
  comment: string
  examCode: string
  expert: IExpert
  note: string
  resolution?: boolean
  resolutionDate?: string
  inCheck?: boolean
  videoAvailable?: boolean
  reportReady?: boolean
}
