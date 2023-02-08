import {IRoute} from '../../ts/interfaces/IRoute';
import {subRolesCallbackConfig} from '../../config/router/authСonfig';
import {IUserApp} from '../../ts/interfaces/IUserApp';
import store from '../../store';
import {rolesToRoutesConfig} from '../../config/router/rolesToRoutesConfig';

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
