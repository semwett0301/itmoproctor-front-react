import { IInspector } from './IInspector'

export interface IScheduleRow {
  _id: string
  concurrent: number
  maxExamsBeginnings: number
  inspector: IInspector
  beginDate: string
  endDate: string
  __v: number
}

export interface ISchedule {
  total: number
  rows: IScheduleRow[]
}
