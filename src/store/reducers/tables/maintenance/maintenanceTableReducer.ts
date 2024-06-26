import {Reducer} from 'redux'
import {ITableParams} from '../../../../ts/interfaces/ITableParams'
import {ActionPayloadTable, initialTableParams, MaintenanceFilter} from '../../../../config/store/tablesReducerConfig'
import {IAction} from '../../../../ts/interfaces/IAction'
import {ITotalRowsVariants} from '../../../../components/shared/SharedPagination/PaginationField/PaginationField'
import {ITotalPagination} from '../../../../ts/interfaces/IPagination'
import {MaintenanceTableActionTypes} from './maintenanceTableActionTypes'
import {getInitialDateRange} from '../../../../utils/common/dateUtils'

const initialState: ITableParams<MaintenanceFilter> = initialTableParams<MaintenanceFilter>({
  date: getInitialDateRange()
})

export const maintenanceTableReducer: Reducer<ITableParams<MaintenanceFilter>> = (
  state = initialState,
  action: IAction<MaintenanceTableActionTypes, ActionPayloadTable<MaintenanceFilter>>
) => {
  switch (action.type) {
    case MaintenanceTableActionTypes.maintenance_set_total_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...(action.payload as ITotalPagination)
        }
      }
    case MaintenanceTableActionTypes.maintenance_set_displayed_rows:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          displayedRows: action.payload as ITotalRowsVariants
        }
      }
    case MaintenanceTableActionTypes.maintenance_set_select:
      return {
        ...state,
        selectedRowsId: action.payload as string[]
      }

    case MaintenanceTableActionTypes.maintenance_set_current_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload as number
        }
      }

    case MaintenanceTableActionTypes.maintenance_set_filter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...(action.payload as MaintenanceFilter)
        }
      }

    case MaintenanceTableActionTypes.maintenance_reset:
      return initialState

    default:
      return state
  }
}
