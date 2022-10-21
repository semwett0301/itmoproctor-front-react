import { IOrganization, IOrganizations } from '../ts/interfaces/IOrganizations'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { request } from '../api/axios/request'
import { AppDispatch } from '../store'
import { setOrganizationActionCreator } from '../store/reducers/organizationsReducer/organizationsActionCreators'

interface IOrganizationsArguments {
  setter: (organizations: IOrganization[]) => void
  ids?: string[]
}

export const useOrganizations: (args: IOrganizationsArguments) => [boolean, () => void] = ({
  setter,
  ids
}) => {
  const [loading, setLoading] = useState(false)
  const organizations: IOrganizations = useAppSelector((state) => state.organizations)
  const dispatch: AppDispatch = useAppDispatch()

  const loadOrganizations = () => {
    let newOrganizationList: IOrganization[] = []

    if (Object.keys(organizations).length === 0) {
      setLoading(true)
      request.organizations.getListOfOrganizations().then((r) => {
        const newOrganizations: IOrganizations = {}
        r.data.map((e) => {
          newOrganizations[e._id] = e
        })
        dispatch(setOrganizationActionCreator(newOrganizations))

        if (ids) {
          ids.map((e) => {
            newOrganizationList.push(organizations[e])
          })
        } else {
          newOrganizationList = Object.values(organizations)
        }

        setter(newOrganizationList)
        setLoading(false)
      })
    }
  }

  return [loading, loadOrganizations]
}
