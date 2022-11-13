import {Filter} from '../types/Filter';
import {IPagination} from './IPagination';

export interface ITableParams<T extends Filter> {
  selectedRowsId: string[]
  filter: T
  pagination: IPagination
}
