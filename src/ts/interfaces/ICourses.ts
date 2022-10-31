import { IOrganization } from './IOrganizations'

export interface ICourseRow {
  _id: string
  organization: IOrganization
  courseCode: string
  sessionCode: string
  accessAllowed: IOrganization[]
  verifications: string[]
  updated: string
  __v?: number
}

export interface ICourses {
  total: number
  rows: ICourseRow[] | []
  organizations: string[] | []
}
