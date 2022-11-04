// TYPES

import { useState } from 'react'
import { IOrganization } from '../ts/interfaces/IOrganizations'

export type ISearchQuery = string | null
export type IFilterOrganizations = IOrganization[] | null | 'kjkjkj'

interface IFilter {
  text: ISearchQuery
  organizations: IFilterOrganizations
}

export const useFilter = (): [
  { text: ISearchQuery; organizations: IFilterOrganizations },
  { setText: (item: ISearchQuery) => void; setOrganizat: (item: IFilterOrganizations) => void }
] => {
  const [{ text, organizations }, setFilter] = useState<IFilter>({
    text: null,
    organizations: 'kjkjkj'
  })

  const setText = (query: ISearchQuery): void =>
    setFilter((prevState) => ({
      ...prevState,
      text: query
    }))

  const setOrganizat = (item: IFilterOrganizations): void =>
    setFilter((prevState) => ({
      ...prevState,
      organizations: item
    }))

  return [
    { text, organizations },
    { setText, setOrganizat }
  ]
}
