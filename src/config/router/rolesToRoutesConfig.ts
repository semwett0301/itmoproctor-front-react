import {sharedRoutes} from '../../router/modules/sharedRoutes';
import {unauthorizedRoutes} from '../../router/modules/unauthorizedRoutes';
import {studentRoutes} from '../../router/modules/studentRoutes';
import {adminRoutes} from '../../router/modules/adminRoutes';
import {RoleEnum} from './authСonfig';
import {IRoute} from '../../ts/interfaces/IRoute';

type RolesToRoutesConfig = {
  [key in RoleEnum]: IRoute[]
}

// Соотношение ролей и модулей с роутами
export const rolesToRoutesConfig: RolesToRoutesConfig = {
  'ALL': sharedRoutes,
  'UNAUTHORIZED': unauthorizedRoutes,
  'STUDENT': studentRoutes,
  'PROCTOR': [],
  'ADMIN': adminRoutes
}
