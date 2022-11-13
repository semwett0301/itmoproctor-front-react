import {ActionFilterType, TablesEnum} from '../config/tablesReducerConfig';
import {useAppDispatch, useAppSelector} from './reduxHooks';
import {
  setCurrentPagination,
  setNewDisplayedRows,
  setNewFilter,
  setSelect,
  setTotalPagination
} from '../store/reducers/tables/tablesActionCreators';
import {ITotalPagination} from '../ts/interfaces/IPagination';
import {ITotalRowsVariants} from '../components/shared/SharedPagination/PaginationField/PaginationField';

export function useTable(tableName: TablesEnum) {
  const {selectedRowsId, filter, pagination} = useAppSelector(state => state.tables[tableName])
  const dispatch = useAppDispatch()

  const setPagination: (currentPage: number) => void = (currentPage) => {
    dispatch(setCurrentPagination(tableName, currentPage))
  }

  const setDisplayedRows: (displayedRows: ITotalRowsVariants) => void = displayedRows => {
    dispatch(setNewDisplayedRows(tableName, displayedRows))
  }

  const setTotal: (totalRows: number) => void = totalRows => {
    const totalPagination: ITotalPagination = {
      totalRows: totalRows,
      totalPages: Math.ceil(totalRows / pagination.displayedRows.id)
    }
    dispatch(setTotalPagination(tableName, totalPagination))
  }

  const setSelectedRowsId: (select: string[]) => void = (select) => {
    dispatch(setSelect(tableName, select))
  }

  const setFilter: (newFilterAddition: ActionFilterType) => void = newFilterAddition => {
    dispatch(setNewFilter(newFilterAddition))
  }

  return {
    selectedRowsId, filter, pagination,
    setSelectedRowsId, setFilter, setPagination, setDisplayedRows, setTotal
  }
}
