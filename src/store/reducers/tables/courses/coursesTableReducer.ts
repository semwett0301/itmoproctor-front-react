import {Reducer} from 'redux';
import {ITableParams} from '../../../../ts/interfaces/ITableParams';
import {ActionPayloadTable, CoursesFilter, initialTableParams} from '../../../../config/store/tablesReducerConfig';
import {IAction} from '../../../../ts/interfaces/IAction';
import {ITotalRowsVariants} from '../../../../components/shared/SharedPagination/PaginationField/PaginationField';
import {ITotalPagination} from '../../../../ts/interfaces/IPagination';
import {CoursesTableActionTypes} from './coursesTableActionTypes';

const initialState: ITableParams<CoursesFilter> = initialTableParams<CoursesFilter>({
  searchQuery: null,
  organizations: null
})

export const coursesTableReducer: Reducer<ITableParams<CoursesFilter>> = (state = initialState, action: IAction<CoursesTableActionTypes, ActionPayloadTable<CoursesFilter>>) => {
  switch (action.type) {
    case CoursesTableActionTypes.courses_set_total_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload as ITotalPagination
        }
      }
    case CoursesTableActionTypes.courses_set_displayed_rows:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          displayedRows: action.payload as ITotalRowsVariants
        }
      }
    case CoursesTableActionTypes.courses_set_select:
      return {
        ...state,
        selectedRowsId: action.payload as string[]
      }

    case CoursesTableActionTypes.courses_set_current_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload as number
        }
      }

    case CoursesTableActionTypes.courses_set_filter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload as CoursesFilter
        }
      }

    case CoursesTableActionTypes.courses_reset:
      return initialState

    default:
      return state
  }
}

