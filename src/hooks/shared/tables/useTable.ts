import {TablesEnum} from '../../../config/store/tablesReducerConfig'
import {
  setCurrentPagination,
  setNewDisplayedRows,
  setNewFilter,
  setSelect,
  setTotalPagination
} from '../../../store/reducers/tables/tablesActionCreators'
import {IPagination, ITotalPagination} from '../../../ts/interfaces/IPagination'
import {ITotalRowsVariants} from '../../../components/shared/SharedPagination/PaginationField/PaginationField'
import {Filter} from '../../../ts/types/Filter'
import {useAppDispatch} from '../../store/useAppDispatch';
import {useAppSelector} from '../../store/useAppSelector';

export function
useTable<T extends Filter>(
  tableName: TablesEnum
): {
  selectedRowsId: string[]
  filter: T
  pagination: IPagination
  setSelectedRowsId: (rowId: string | string[]) => void
  setFilter: (newFilterAddition: {
    [key in keyof T]?: T[key]
  }) => void
  setCurrentPage: (currentPage: number) => void
  setDisplayedRows: (displayedRows: ITotalRowsVariants) => void
  setTotal: (totalRows: number) => void
  dropPagination: () => void
} {
  const { selectedRowsId, filter, pagination } = useAppSelector((state) => state.tables[tableName])
  const dispatch = useAppDispatch()

  const setCurrentPage: (currentPage: number) => void = (currentPage) => {
    dispatch(setCurrentPagination(tableName, currentPage))
  }

  const setDisplayedRows: (displayedRows: ITotalRowsVariants) => void = (displayedRows) => {
    dispatch(setNewDisplayedRows(tableName, displayedRows))
    dispatch(setCurrentPagination(tableName, 0))
  }

  const dropPagination: () => void = () => {
    dispatch(
      setTotalPagination(tableName, {
        totalPages: 0,
        totalRows: 0
      })
    )
    dispatch(setCurrentPagination(tableName, 0))
  }

  const setTotal: (totalRows: number) => void = (totalRows) => {
    const totalPagination: ITotalPagination = {
      totalRows: totalRows,
      totalPages: Math.ceil(totalRows / pagination.displayedRows.id)
    }
    dispatch(setTotalPagination(tableName, totalPagination))
  }

  const setSelectedRowsId: (rowId: string | string[]) => void = (rowId) => {
    if (typeof rowId === 'string') {
      if (selectedRowsId.includes(rowId)) {
        dispatch(
          setSelect(
            tableName,
            selectedRowsId.filter((item: string) => item != rowId)
          )
        )
      } else {
        dispatch(setSelect(tableName, [...selectedRowsId, rowId]))
      }
    } else {
      dispatch(setSelect(tableName, rowId))
    }
  }

  const setFilter: (newFilterAddition: {
    [key in keyof T]?: T[key]
  }) => void = (newFilterAddition) => {
    dispatch(
      setNewFilter({
        name: tableName,
        newFilter: newFilterAddition
      })
    )
  }

  return {
    selectedRowsId,
    filter,
    pagination,
    setSelectedRowsId,
    setFilter,
    setCurrentPage,
    setDisplayedRows,
    setTotal,
    dropPagination
  }
}
