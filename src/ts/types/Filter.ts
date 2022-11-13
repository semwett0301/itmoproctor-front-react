import {typeItem} from '../../components/shared/Filter/ExamTypeSelect/ExamTypeSelect';
import {StatusComboboxItem} from '../../components/shared/Filter/ExamStatusCombobox/ExamStatusCombobox';
import {IOrganization} from '../interfaces/IOrganizations';
import {providerItem} from '../../components/shared/Filter/ProviderSelect/ProviderSelect';
import {DefaultItem} from '@consta/uikit/__internal__/src/components/Combobox/helpers';
import {Dayjs} from 'dayjs';

export interface IDateFilter {
  date: [Dayjs, Dayjs]
}

export interface ISearchQueryFilter {
  searchQuery: string | null
}

export interface ITypeFilter {
  type: typeItem | null
}

export interface IStatusFilter {
  status: StatusComboboxItem[] | null
}

export interface IOrganizationFilter {
  organizations: IOrganization[] | null,
}

export interface IProviderFilter {
  provider: providerItem | null
}

export interface IRoleFilter {
  role: DefaultItem[] | null
}

export type Filter =
  IDateFilter
  | ISearchQueryFilter
  | ITypeFilter
  | IStatusFilter
  | IOrganizationFilter
  | IProviderFilter
  | IRoleFilter
