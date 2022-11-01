import {IOrganization, IOrganizations} from '../ts/interfaces/IOrganizations'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from './reduxHooks'
import {request} from '../api/axios/request'
import {AppDispatch} from '../store'
import {setOrganizationActionCreator} from '../store/reducers/organizationsReducer/organizationsActionCreators'
import {log} from 'util';

// interface IOrganizationsArguments {
//   setter: (organizations: IOrganization[]) => void
// }


export const useOrganizations = (): {loading: boolean, getOrganizations: (ids?: string[]) => IOrganization[], getOrganization: (id: string) => IOrganization} => {
  const [loading, setLoading] = useState(false)
  const organizations: IOrganizations = useAppSelector((state) => state.organizations)
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
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

    loadOrganizations().then(() => console.log(organizations))
  }, [])

  const getOrganizations = (ids?: string[]): IOrganization[] => {
    if (ids) {
      return Object.values(organizations).filter(e => ids.includes(e._id))
    }
    return Object.values(organizations)
  }

  const getOrganization = (id: string): IOrganization => {
    return organizations[id]
  }

  return {loading, getOrganizations, getOrganization}
}
