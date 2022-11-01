export interface IMaintenanceRow {
  _id: string
  beginDate: string
  endDate: string
  active: boolean
  created: string
  __v: number
}

export interface IMaintenance {
  total: number
  rows: IMaintenanceRow[]
}
