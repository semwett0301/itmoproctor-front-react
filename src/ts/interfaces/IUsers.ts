export interface IUsersRow {
  _id: string
  role: number
  active: boolean
  activityDate: string
  username: string
  firstname: string
  lastname: string
  middlename: string
  email: string
  provider: string
  created: string
  expert?: boolean
  organization: string
}
