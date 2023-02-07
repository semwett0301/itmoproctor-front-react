import {Reducer} from 'redux';
import {ITableParams} from '../../../../ts/interfaces/ITableParams';
import {ActionPayloadTable, initialTableParams, OrganizationsFilter} from '../../../../config/tablesReducerConfig';
import {IAction} from '../../../../ts/interfaces/IAction';
import {ITotalRowsVariants} from '../../../../components/shared/SharedPagination/PaginationField/PaginationField';
import {ITotalPagination} from '../../../../ts/interfaces/IPagination';
import {OrganizationsTableActionTypes} from './organizationsTableActionTypes';

const initialState: ITableParams<OrganizationsFilter> = initialTableParams<OrganizationsFilter>({
  searchQuery: null
})

export const organizationsTableReducer: Reducer<ITableParams<OrganizationsFilter>> = (state = initialState, action: IAction<OrganizationsTableActionTypes, ActionPayloadTable<OrganizationsFilter>>) => {
  switch (action.type) {
    case OrganizationsTableActionTypes.organizations_set_total_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload as ITotalPagination
        }
      }
    case OrganizationsTableActionTypes.organizations_set_displayed_rows:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          displayedRows: action.payload as ITotalRowsVariants
        }
      }
    case OrganizationsTableActionTypes.organizations_set_select:
      return {
        ...state,
        selectedRowsId: action.payload as string[]
      }

    case OrganizationsTableActionTypes.organizations_set_current_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload as number
        }
      }

    case OrganizationsTableActionTypes.organizations_set_filter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload as OrganizationsFilter
        }
      }

    case OrganizationsTableActionTypes.organizations_reset:
      return initialState

    default:
      return state
  }
}

