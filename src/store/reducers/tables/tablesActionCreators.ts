import {ActionFilterType, TablesEnum} from '../../../config/tablesReducerConfig';
import {ITotalPagination} from '../../../ts/interfaces/IPagination';
import {IAction} from '../../../ts/interfaces/IAction';
import {ITotalRowsVariants} from '../../../components/shared/SharedPagination/PaginationField/PaginationField';

export function setTotalPagination(name: TablesEnum, totalPagination: ITotalPagination): IAction<string, ITotalPagination> {
  return {
    type: name + '_' + 'set_total_pagination',
    payload: totalPagination
  }
}

export function setCurrentPagination(name: TablesEnum, currentPage: number): IAction<string, number> {
  return {
    type: name + '_' + 'set_current_pagination',
    payload: currentPage
  }
}

export function setNewDisplayedRows(name: TablesEnum, displayedRows: ITotalRowsVariants): IAction<string, ITotalRowsVariants> {
  return {
    type: name + '_' + 'set_displayed_rows',
    payload: displayedRows
  }
}

export function setSelect(name: TablesEnum, select: string[]): IAction<string, string[]> {
  return {
    type: name + '_' + 'set_select',
    payload: select
  }
}

export function setNewFilter({name, newFilter}: ActionFilterType): IAction<string> {
  return {
    type: name + '_' + 'set_filter',
    payload: newFilter
  }
}
