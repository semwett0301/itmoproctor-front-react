import {ActionFilterType, ActionPayloadTable, TablesEnum} from '../config/tablesReducerConfig'
import {useAppDispatch, useAppSelector} from './reduxHooks'
import {
  setCurrentPagination,
  setNewDisplayedRows,
  setNewFilter,
  setSelect,
  setTotalPagination
} from '../store/reducers/tables/tablesActionCreators'
import {IPagination, ITotalPagination} from '../ts/interfaces/IPagination'
import {ITotalRowsVariants} from '../components/shared/SharedPagination/PaginationField/PaginationField'
import {Filter} from '../ts/types/Filter'

export function useTable<T extends Filter>(tableName: TablesEnum): {
  selectedRowsId: string[]
  filter: T
  pagination: IPagination
  setSelectedRowsId: (rowId: string | string[]) => void
  setFilter: (newFilterAddition: {
    [key in keyof T]: T[key]
  }) => void
  setPagination: (currentPage: number) => void
  setDisplayedRows: (displayedRows: ITotalRowsVariants) => void
  setTotal: (totalRows: number) => void
} {
  const {selectedRowsId, filter, pagination} = useAppSelector((state) => state.tables[tableName])
  const dispatch = useAppDispatch()

  const setPagination: (currentPage: number) => void = (currentPage) => {
    dispatch(setCurrentPagination(tableName, currentPage))
  }

  const setDisplayedRows: (displayedRows: ITotalRowsVariants) => void = (displayedRows) => {
    dispatch(setNewDisplayedRows(tableName, displayedRows))
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
    [key in keyof T]: T[key]
  }) => void = (newFilterAddition) => {
    dispatch(setNewFilter({
      name: tableName,
      newFilter: newFilterAddition
    }))
  }

  return {
    selectedRowsId,
    filter,
    pagination,
    setSelectedRowsId,
    setFilter,
    setPagination,
    setDisplayedRows,
    setTotal
  }
}
