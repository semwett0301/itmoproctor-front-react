import { IOrganization, IOrganizations } from '../ts/interfaces/IOrganizations'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { request } from '../api/axios/request'
import { AppDispatch } from '../store'
import { setOrganizationActionCreator } from '../store/reducers/organizationsReducer/organizationsActionCreators'

interface IOrganizationsArguments {
  setter: (organizations: IOrganization[]) => void
}

interface IOrganizationFunctionArguments {
  ids?: string[]
}

export const useOrganizations: (
  args: IOrganizationsArguments
) => [boolean, (args: IOrganizationFunctionArguments) => void] = ({ setter }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const organizations: IOrganizations = useAppSelector((state) => state.organizations)
  const dispatch: AppDispatch = useAppDispatch()

  const loadOrganizations = ({ ids }: IOrganizationFunctionArguments) => {
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
