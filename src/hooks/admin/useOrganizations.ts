import {IOrganization, IOrganizationFull, IOrganizations} from '../../ts/interfaces/IOrganizations'
import {useLayoutEffect, useState} from 'react'
import {request} from '../../api/axios/request'
import {AppDispatch} from '../../store'
import {
  addOrganizationActionCreator,
  changeOrganizationActionCreator,
  deleteOrganizationActionCreator,
  setOrganizationsActionCreator
} from '../../store/reducers/organizations/organizationsActionCreators'
import {useAppDispatch} from '../store/useAppDispatch';
import {useAppSelector} from '../store/useAppSelector';
import {organizationComparator} from '../../utils/admin/organizations/organizationComparator';

export const useOrganizations = () => {
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
          dispatch(setOrganizationsActionCreator(newOrganizations))
          setLoading(false)
        })
      }
    }

    loadOrganizations().catch((e) => console.log(e))
  }, [])

  const getOrganizations = (ids?: string[]): IOrganization[] => {
    if (ids) {
      return Object.values(organizations).filter((e) => ids.includes(e._id)).sort(organizationComparator)
    }
    return Object.values(organizations).sort(organizationComparator)
  }

  const getOrganization = (id: string): IOrganization => {
    return organizations[id]
  }

  const changeOrganizations: (org: IOrganizationFull, mode: 'delete' | 'add' | 'change') => void = (org, type) => {
    if (org._id !== null) {
      const currentOrganization: IOrganization = {
        _id: org._id,
        code: org.code ?? undefined,
        fullName: org.fullNameRU,
        shortName: org.shortNameRU ?? undefined
      }

      switch (type) {
        case 'add':
          dispatch(addOrganizationActionCreator(currentOrganization))
          break
        case 'change':
          dispatch(changeOrganizationActionCreator(currentOrganization))
          break
        case 'delete':
          dispatch(deleteOrganizationActionCreator(currentOrganization))
      }
    }
  }

  return { loading, getOrganizations, getOrganization, changeOrganizations }
}
