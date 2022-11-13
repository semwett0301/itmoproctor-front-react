import {Reducer} from 'redux';
import {ITableParams} from '../../../../ts/interfaces/ITableParams';
import {ActionPayloadTable, initialTableParams, UserFilter} from '../../../../config/tablesReducerConfig';
import {IAction} from '../../../../ts/interfaces/IAction';
import {ITotalRowsVariants} from '../../../../components/shared/SharedPagination/PaginationField/PaginationField';
import {ITotalPagination} from '../../../../ts/interfaces/IPagination';
import {UsersTableActionTypes} from './usersTableActionTypes';

const initialState: ITableParams<UserFilter> = initialTableParams<UserFilter>({
  searchQuery: null,
  organizations: null,
  provider: null,
  role: null
})

export const usersTableReducer: Reducer<ITableParams<UserFilter>> = (state = initialState, action: IAction<UsersTableActionTypes, ActionPayloadTable<UserFilter>>) => {
  switch (action.type) {
    case UsersTableActionTypes.users_set_total_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload as ITotalPagination
        }
      }
    case UsersTableActionTypes.users_set_displayed_rows:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          displayedRows: action.payload as ITotalRowsVariants
        }
      }
    case UsersTableActionTypes.users_set_select:
      return {
        ...state,
        selectedRowsId: action.payload as string[]
      }

    case UsersTableActionTypes.users_set_current_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload as number
        }
      }

    case UsersTableActionTypes.users_set_filter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload as UserFilter
        }
      }

    default:
      return state
  }
}

