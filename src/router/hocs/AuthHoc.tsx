import React, {FC} from 'react'
import {Navigate, Outlet, useLocation, useOutletContext} from 'react-router-dom'
import {useAppSelector} from '../../hooks/reduxHooks'
import {RoleEnum, subRolesCallbackConfig, subRolesMapToRolesConfig} from '../../config/authСonfig'
import {HocPropsType} from '../../ts/types/HocPropsType'
import {IUserApp} from '../../ts/interfaces/IUserApp';

const AuthHoc: FC<HocPropsType<RoleEnum>> = ({condition, route}) => {
  const location = useLocation()
  const context = useOutletContext()
  const user: IUserApp = useAppSelector((state) => state.user)

  if (condition && route.subRole && !subRolesMapToRolesConfig[condition].includes(route.subRole))
    throw new TypeError('Вы пытаетесь наложить ограничения подроли на роль, хотя у нее нет такой подроли (она не зарегистрирована в конфиге)')

  if (condition === RoleEnum.ALL) {
    return <Outlet context={context}/>
  }

  if (condition === user.role) {
    if (!route.subRole || subRolesCallbackConfig[route.subRole](user)) {
      return <Outlet context={context}/>
    }
  }

  if (user.role === RoleEnum.UNAUTHORIZED) {
    return <Navigate to={'/login'} state={{from: location}}/>
  }

  return <Navigate to={'/'} state={{from: location}}/>
}

export default AuthHoc
