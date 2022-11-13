import {ActionFilterType, TablesEnum} from '../config/tablesReducerConfig';
import {useAppDispatch, useAppSelector} from './reduxHooks';
import {
  setCurrentPagination,
  setNewDisplayedRows,
  setNewFilter,
  setSelect,
  setTotalPagination
} from '../store/reducers/tables/tablesActionCreators';
import {IPagination, ITotalPagination} from '../ts/interfaces/IPagination';
import {ITotalRowsVariants} from '../components/shared/SharedPagination/PaginationField/PaginationField';
import {Filter} from '../ts/types/Filter';

export function useTable(tableName: TablesEnum): {
  selectedRowsId: string[],
  filter: Filter,
  pagination: IPagination,
  setSelectedRowsId: (select: string[]) => void,
  setFilter: (newFilterAddition: ActionFilterType) => void,
  setPagination: (currentPage: number) => void,
  setDisplayedRows: (displayedRows: ITotalRowsVariants) => void,
  setTotal: (totalRows: number) => void
} {
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
