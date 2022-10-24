export interface IOrganization {
  _id: string
  code?: string
  fullName?: string
  shortName?: string
}

export interface IOrganizations {
  [_id: string]: IOrganization
}
