import { ProviderEnum, RoleEnum } from '../../config/authСonfig'
import { IOrganization } from './IOrganizations'

export interface IUser {
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
  active: boolean
  activityDate?: string
  address: string
  created: string
  expert?: boolean
  system?: boolean
  gender: string
  organization: IOrganization
  provider: ProviderEnum
  role: RoleEnum
  _id: string
  __v?: number
  // это поле не учитывать
  attach?: unknown[]
}
