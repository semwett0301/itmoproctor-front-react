import {Reducer} from 'redux';
import {ITableParams} from '../../../../ts/interfaces/ITableParams';
import {ActionPayloadTable, ExamFilter, initialTableParams} from '../../../../config/tablesReducerConfig';
import {IAction} from '../../../../ts/interfaces/IAction';
import {ExamsTableActionTypes} from './examsTableActionTypes';
import {statusList} from '../../../../components/shared/Filter/ExamStatusCombobox/ExamStatusCombobox';
import {ITotalRowsVariants} from '../../../../components/shared/SharedPagination/PaginationField/PaginationField';
import {ITotalPagination} from '../../../../ts/interfaces/IPagination';
import dayjs from 'dayjs';

const initialState: ITableParams<ExamFilter> = initialTableParams<ExamFilter>({
  date: [dayjs(), dayjs()],
  searchQuery: null,
  type: null,
  status: [statusList[0]],
  organizations: null
})

export const examsTableReducer: Reducer<ITableParams<ExamFilter>> = (state = initialState, action: IAction<ExamsTableActionTypes, ActionPayloadTable<ExamFilter>>) => {
  switch (action.type) {
    case ExamsTableActionTypes.exams_set_total_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload as ITotalPagination
        }
      }
    case ExamsTableActionTypes.exams_set_displayed_rows:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          displayedRows: action.payload as ITotalRowsVariants
        }
      }
    case ExamsTableActionTypes.exams_set_select:
      return {
        ...state,
        selectedRowsId: action.payload as string[]
      }

    case ExamsTableActionTypes.exams_set_current_pagination:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload as number
        }
      }

    case ExamsTableActionTypes.exams_set_filter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload as ExamFilter
        }
      }

    default:
      return state
  }
}

