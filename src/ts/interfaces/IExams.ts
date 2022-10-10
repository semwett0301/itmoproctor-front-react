import { IOrganization } from './IOrganization'

export interface Course {
  _id: string
  accessAllowed: string[]
  courseCode: string
  sessionCode: string
}

export interface Student {
  _id: string
  username: string
  lastname: string
  firstname: string
  middlename: string
  email: string
  provider: string
  organization: string
}

export interface Inspector {
  _id: string
  username: string
  lastname: string
  firstname: string
  middlename: string
  organization: string
}

export interface Expert {
  _id: string
  username: string
  lastname: string
  firstname: string
  middlename?: any
}

export interface IExamRow {
  _id: string
  examId: string
  organization: string
  course: Course
  assignment: string
  subject: string
  student: Student
  async: boolean
  duration: number
  leftDate: Date
  rightDate: Date
  __v: number
  beginDate: Date
  endDate: Date
  inspector: Inspector
  startDate?: Date
  inspectorConnected: boolean
  stopDate?: Date
  comment: string
  examCode: string
  expert: Expert
  note: string
  resolution?: boolean
  resolutionDate?: Date
  inCheck?: boolean
  videoAvailable?: boolean
  reportReady?: boolean
}

export interface IExams {
  total: number
  rows: IExamRow[] | []
  organizations: IOrganization[] | []
}
