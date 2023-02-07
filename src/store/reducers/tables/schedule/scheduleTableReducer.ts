import { Reducer } from 'redux'
import { ITableParams } from '../../../../ts/interfaces/ITableParams'
import {
  ActionPayloadTable,
  initialTableParams,
  ScheduleFilter
} from '../../../../config/tablesReducerConfig'
import { IAction } from '../../../../ts/interfaces/IAction'
import { ITotalRowsVariants } from '../../../../components/shared/SharedPagination/PaginationField/PaginationField'
import { ITotalPagination } from '../../../../ts/interfaces/IPagination'
import { ScheduleTableActionTypes } from './scheduleTableActionTypes'
import { getInitialDateRange } from '../../../../utils/dateUtils'

const initialState: ITableParams<ScheduleFilter> = initialTableParams<ScheduleFilter>({
  searchQuery: null,
  date: getInitialDateRange()
})

export const scheduleTableReducer: Reducer<ITableParams<ScheduleFilter>> = (
  state = initialState,
  action: IAction<ScheduleTableActionTypes, ActionPayloadTable<ScheduleFilter>>
) => {
  switch (action.type) {
    case ScheduleTableActionTypes.schedule_set_total_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...(action.payload as ITotalPagination)
        }
      }
    case ScheduleTableActionTypes.schedule_set_displayed_rows:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          displayedRows: action.payload as ITotalRowsVariants
        }
      }
    case ScheduleTableActionTypes.schedule_set_select:
      return {
        ...state,
        selectedRowsId: action.payload as string[]
      }

    case ScheduleTableActionTypes.schedule_set_current_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload as number
        }
      }

    case ScheduleTableActionTypes.schedule_set_filter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...(action.payload as ScheduleFilter)
        }
      }

    case ScheduleTableActionTypes.schedule_reset:
      return initialState

    default:
      return state
  }
}
