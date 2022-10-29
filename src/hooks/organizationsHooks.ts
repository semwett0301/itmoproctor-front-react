import {IOrganization, IOrganizations} from '../ts/interfaces/IOrganizations'
import {Dispatch, SetStateAction, useState} from 'react'
import {useAppDispatch, useAppSelector} from './reduxHooks'
import {request} from '../api/axios/request'
import {AppDispatch} from '../store'
import {setOrganizationActionCreator} from '../store/reducers/organizationsReducer/organizationsActionCreators'

// interface IOrganizationsArguments {
//   setter: (organizations: IOrganization[]) => void
// }


export const useOrganizations = (
  setter: Dispatch<SetStateAction<IOrganization[]>>
): [boolean, (ids?: string[]) => void, (id: string) => IOrganization] => {
  const [loading, setLoading] = useState(false)
  const organizations: IOrganizations = useAppSelector((state) => state.organizations)
  const dispatch: AppDispatch = useAppDispatch()

  if (Object.keys(organizations).length === 0) {
    setLoading(true)
    request.organizations.getListOfOrganizations().then((r) => {
      const newOrganizations: IOrganizations = {}
      r.data.rows.map((e) => {
        newOrganizations[e._id] = e
      })
      dispatch(setOrganizationActionCreator(newOrganizations))
    })
  }

  const loadOrganizations = (ids?: string[]): void => {
    let newOrganizationList: IOrganization[] = []

    if (ids) {
      ids.map((e) => {
        newOrganizationList.push(organizations[e])
      })
    } else {
      newOrganizationList = Object.values(organizations)
    }

    setter(newOrganizationList)
  }

  const getOrganization: (id: string) => IOrganization = (id) => {
    return organizations[id]
  }

  return [loading, loadOrganizations, getOrganization]
}
