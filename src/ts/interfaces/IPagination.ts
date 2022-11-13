import {ITotalRowsVariants} from '../../components/shared/SharedPagination/PaginationField/PaginationField';

export interface ITotalPagination {
  totalRows: number
  totalPages: number
}

export interface IPagination extends ITotalPagination{
  displayedRows: ITotalRowsVariants
  currentPage: number
}
