export interface IMaintenance {
  _id: string
  beginDate: string
  endDate: string
  active: boolean
  created: string
}

export interface IMaintenancePost {
  beginDate: string
  endDate: string
  active: boolean
}
