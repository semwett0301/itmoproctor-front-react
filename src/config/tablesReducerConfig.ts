import { ITableParams } from '../ts/interfaces/ITableParams'
import {
  ITotalRowsVariants,
  totalRowsVariants
} from '../components/shared/SharedPagination/PaginationField/PaginationField'
import {
  Filter,
  IDateFilter,
  IOrganizationFilter,
  IProviderFilter,
  IRoleFilter,
  ISearchQueryFilter,
  IStatusFilter,
  ITypeFilter
} from '../ts/types/Filter'
import { ITotalPagination } from '../ts/interfaces/IPagination'

// Список табличек

export enum TablesEnum {
  EXAMS = 'exams',
  USERS = 'users',
  COURSES = 'courses',
  SCHEDULE = 'schedule',
  MAINTENANCE = 'maintenance',
  ORGANIZATIONS = 'organizations'
}

// Конфигурация IAction в зависимости от таблички (фильтра)

export type ActionPayloadTable<T extends Filter> =
  | ITotalRowsVariants
  | ITotalPagination
  | string[]
  | number
  | {
      [key in keyof T]: T[key]
    }

// Конфигурация изначальных значений

export function initialTableParams<T extends Filter>(filter: T): ITableParams<T> {
  return {
    selectedRowsId: [],
    filter: filter,
    pagination: {
      displayedRows: totalRowsVariants[0],
      currentPage: 0,
      totalPages: 0,
      totalRows: 0
    }
  }
}

// Конфигурация типов для фильтров в зависимости от странички

export type ExamFilter = IDateFilter &
  ISearchQueryFilter &
  ITypeFilter &
  IStatusFilter &
  IOrganizationFilter

export type UserFilter = ISearchQueryFilter & IOrganizationFilter & IProviderFilter & IRoleFilter

export type CoursesFilter = ISearchQueryFilter & IOrganizationFilter

export type ScheduleFilter = ISearchQueryFilter & IDateFilter

export type MaintenanceFilter = IDateFilter

export type OrganizationsFilter = ISearchQueryFilter

// Конфигурация Action Creator на фильтр в зависимости от таблички

type ExamsActionFilterType = {
  name: TablesEnum.EXAMS
  newFilter: {
    [key in keyof ExamFilter]?: ExamFilter[key]
  }
}

type UsersActionFilterType = {
  name: TablesEnum.USERS
  newFilter: {
    [key in keyof UserFilter]?: UserFilter[key]
  }
}

type CoursesActionFilterType = {
  name: TablesEnum.COURSES
  newFilter: {
    [key in keyof CoursesFilter]?: CoursesFilter[key]
  }
}

type ScheduleActionFilterType = {
  name: TablesEnum.SCHEDULE
  newFilter: {
    [key in keyof ScheduleFilter]?: ScheduleFilter[key]
  }
}

type MaintenanceActionFilterType = {
  name: TablesEnum.MAINTENANCE
  newFilter: {
    [key in keyof MaintenanceFilter]?: MaintenanceFilter[key]
  }
}

type OrganizationsActionFilterType = {
  name: TablesEnum.ORGANIZATIONS
  newFilter: {
    [key in keyof OrganizationsFilter]?: OrganizationsFilter[key]
  }
}

export type ActionFilterType =
  | ExamsActionFilterType
  | UsersActionFilterType
  | CoursesActionFilterType
  | ScheduleActionFilterType
  | MaintenanceActionFilterType
  | OrganizationsActionFilterType
