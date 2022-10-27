export interface IOrganization {
  _id: string
  code?: string
  fullName?: string
  shortName?: string
}

export interface IOrganizationsResponse {
  rows: IOrganization[]
  total: number
}

export interface IOrganizations {
  [_id: string]: IOrganization
}
