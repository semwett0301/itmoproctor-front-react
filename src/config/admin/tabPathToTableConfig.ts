import {TablesEnum} from '../store/tablesReducerConfig';

export const tabPathToTableConfig: {
  [key: string]: TablesEnum
} = {
  'exams': TablesEnum.EXAMS,
  'users': TablesEnum.USERS,
  'schedule': TablesEnum.SCHEDULE,
  'courses': TablesEnum.COURSES,
  'organizations': TablesEnum.ORGANIZATIONS,
  'maintenance': TablesEnum.MAINTENANCE
}
