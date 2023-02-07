import { ProviderEnum, RoleEnum } from '../../config/authСonfig'
import { IOrganization } from './IOrganizations'

interface IUser {
  birthday: string
  email: string
  firstname: string
  middlename: string
  lastname: string
  username: string
  citizenship: string
  documentIssueDate: string
  documentNumber: string
  documentType: string
  description: string
  active: boolean | string
  activityDate?: string
  address: string
  created: string
  expert: boolean | null
  system?: boolean
  gender: string
  organization: IOrganization
  provider: ProviderEnum
  _id: string
  attach?: unknown[]
}

export interface IUserApp extends IUser {
  role: RoleEnum
}

export interface IUserBackend extends IUser {
  role: number
}
