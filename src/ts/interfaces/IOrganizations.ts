export interface IOrganization {
  _id: string
  code?: string
  fullName: string
  shortName?: string
}

export interface IOrganizationFull {
  _id: string | null
  fullNameRU: string
  shortNameRU: string | null
  fullNameEN: string | null
  shortNameEN: string | null
  code: string | null
  __v?: number
  openeduId: number | null
  registrationNumber: string | null
}

export interface IOrganizationsResponse {
  rows: IOrganization[]
  total: number
}

export interface IOrganizations {
  [_id: string]: IOrganization
}
