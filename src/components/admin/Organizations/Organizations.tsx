import React, {FC} from 'react'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import {usePagination} from '../../../hooks/paginationHooks'
import {statusComboboxItem} from '../../shared/Filter/ExamStatusCombobox/ExamStatusCombobox'
import {typeItem} from '../../shared/Filter/ExamTypeSelect/ExamTypeSelect'
import {IOrganization} from '../../../ts/interfaces/IOrganizations'
import {Layout} from '@consta/uikit/Layout'

interface IFilter {
  date: [Date, Date]
  searchQuery: string | null
  type: typeItem | null
  status: statusComboboxItem[] | null
  organizations: IOrganization[] | null
}

const Organizations: FC = () => {
  // table

  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  return (
    <Layout>
      <SharedPagination pagination={pagination} setPagination={setPagination} />
    </Layout>
  )
}

export default Organizations
