import { IOrganization, IOrganizations } from '../ts/interfaces/IOrganizations'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { request } from '../api/axios/request'
import { AppDispatch } from '../store'
import { setOrganizationActionCreator } from '../store/reducers/organizations/organizationsActionCreators'

export const useOrganizations = (): {
  loading: boolean
  getOrganizations: (ids?: string[]) => Promise<IOrganization[]>
  getOrganization: (id: string) => IOrganization
} => {
  const [loading, setLoading] = useState(false)
  const organizations: IOrganizations = useAppSelector((state) => state.organizations)
  const dispatch: AppDispatch = useAppDispatch()

  useLayoutEffect(() => {
    const loadOrganizations: () => Promise<void> = async () => {
      if (Object.keys(organizations).length === 0) {
        setLoading(true)
        const newOrganizations: IOrganizations = {}
        await request.organizations.getListOfOrganizations().then((r) => {
          r.data.rows.map((e) => {
            newOrganizations[e._id] = e
          })
          dispatch(setOrganizationActionCreator(newOrganizations))
          setLoading(false)
        })
      }
    }

    loadOrganizations().catch((e) => console.log(e))
  }, [])

  const getOrganizations = async (ids?: string[]): Promise<IOrganization[]> => {
    if (ids) {
      return Object.values(organizations).filter((e) => ids.includes(e._id))
    }
    return Object.values(organizations)
  }

  const getOrganization = (id: string): IOrganization => {
    return organizations[id]
  }

  return { loading, getOrganizations, getOrganization }
}
