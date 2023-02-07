import { combineReducers, Reducer } from 'redux'
import { userReducer } from './userReducer/userReducer'
import { organizationsReducer } from './organizations/organizationsReducer'
import { TablesEnum } from '../../config/tablesReducerConfig'
import { examsTableReducer } from './tables/examsTableReducer/examsTableReducer'
import { usersTableReducer } from './tables/usersTableReducer/usersTableReducer'
import { coursesTableReducer } from './tables/courses/coursesTableReducer'
import { scheduleTableReducer } from './tables/schedule/scheduleTableReducer'
import { maintenanceTableReducer } from './tables/maintenance/maintenanceTableReducer'
import { organizationsTableReducer } from './tables/organizations/organizationsTableReducer'
import { userLoadedReducer } from './userLoaded/userLoadedReducer'
import { isLoadingReducer } from './isLoading/isLoadingReducer'
import { osInfoReducer } from './osInfo/osInfoReducer'
import { selectedModalReducer } from './selectedModal/selectedModalReducer'
import {deviceSettingsReducer} from './deviceSettings/deviceSettingsReducer';
import {notificationListReducer} from './notificationList/notificationListReducer';

const tableReducer = combineReducers<{ [value in TablesEnum]: Reducer }>({
  exams: examsTableReducer,
  users: usersTableReducer,
  courses: coursesTableReducer,
  schedule: scheduleTableReducer,
  maintenance: maintenanceTableReducer,
  organizations: organizationsTableReducer
})

export const combineReducer = combineReducers({
  user: userReducer,
  userLoaded: userLoadedReducer,
  isLoading: isLoadingReducer,
  osInfo: osInfoReducer,
  organizations: organizationsReducer,
  tables: tableReducer,
  selectedModal: selectedModalReducer,
  deviceSettings: deviceSettingsReducer,
  notificationList: notificationListReducer
})
