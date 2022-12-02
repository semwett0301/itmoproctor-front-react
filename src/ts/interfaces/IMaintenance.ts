export interface IMaintenance {
  _id: string
  beginDate: string
  endDate: string
  active: boolean
  created: string
  __v: number
}

export interface IMaintenancePost {
  beginDate: string
  endDate: string
  active: boolean
}
