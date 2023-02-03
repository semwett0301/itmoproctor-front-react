import {IRoute} from '../ts/interfaces/IRoute';
import {sharedRoutes} from '../router/modules/sharedRoutes';
import {unauthorizedRoutes} from '../router/modules/unauthorizedRoutes';
import {studentRoutes} from '../router/modules/studentRoutes';
import {adminRoutes} from '../router/modules/adminRoutes';
import {RoleEnum, subRolesCallbackConfig} from '../config/authСonfig';
import {IUserApp} from '../ts/interfaces/IUserApp';
import store from '../store';

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

export const userRoutes: () => IRoute[] = () => {
  const user: IUserApp = store.getState().user

  const filterRoutes: (routes: IRoute[]) => IRoute[] = routes => {
    routes.forEach(route => {
      if (route.children) {
        route.children = filterRoutes(route.children)
      }
    })

    return routes.filter(route => {
      return !route.subRole || subRolesCallbackConfig[route.subRole](user)
    })
  }

  return filterRoutes(rolesToRoutesConfig[user.role])
}
