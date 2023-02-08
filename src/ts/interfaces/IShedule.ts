import {IInspector} from './IInspector'

export interface IScheduleRow {
  _id: string
  concurrent: number
  maxExamsBeginnings: number
  inspector: IInspector
  beginDate: string
  endDate: string
}

export interface ISchedulePostResponse {
  _id: string
  concurrent: string
  maxExamsBeginnings: string
  inspector: string
  beginDate: string
  endDate: string
}
