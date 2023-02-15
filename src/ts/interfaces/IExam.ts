import {IOrganization} from './IOrganizations'
import {IStudent} from './IStudent'
import {IInspector} from './IInspector'
import {IExpert} from './IExpert'
import {ICourse} from './ICourse'
import {VerificationType} from '../types/Verifications'

export interface IVerified {
  _id: string
  submit: boolean
}

export interface IFactors {
  web_sites: boolean
  books: boolean
  papersheet: boolean
  messengers: boolean
  calculator: boolean
  excel: boolean
  absence: boolean
  gaze_averted: boolean
  custom_rules: string
  asynchronous: boolean
  voices: boolean
  human_assistant: boolean
}

export type IFactorsKeys = keyof IFactors
export type ViolationsNames = 'noFaces' | 'severalFaces' | 'noSounds'

export interface IViolation {
  name: ViolationsNames
  probability: number
  count?: number
  fromFrame?: number
  toFrame?: number
}

export interface IResult {
  startTime: number
  endTime: number
  frames?: number
  violations: IViolation[]
}

export interface IStats {
  noFaces: number
  severalFaces: number
  noSounds: number
}

export interface IVideos {
  results: IResult[]
  stats: IStats
  totalTime: number
}

export interface IReport {
  videos: IVideos
  // Всегда пустой массив
  images: {
    results: []
  }
}
export interface IExam {
  name?: string

  examCode: string
  _id: string
  examId: string
  organization: IOrganization
  course?: ICourse
  assignment: string
  subject: string
  student: IStudent
  inspector: IInspector
  expert: IExpert | null
  async?: boolean
  verifications: VerificationType[] | null
  platformURL: string
  duration: number
  leftDate: string
  rightDate: string
  beginDate?: string
  endDate?: string
  startDate?: string
  stopDate?: string
  planDate?: string
  verified: IVerified
  resolution: boolean | null
  comment: string
  report: IReport
  info: string
  note: string
  resolutionDate: string
  factors?: IFactors
  inCheck: boolean
}
