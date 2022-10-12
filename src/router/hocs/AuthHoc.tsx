import React, { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { RoleEnum } from '../../config/authСonfig'
import { HocPropsType } from '../../ts/types/HocPropsType'

const AuthHoc: FC<HocPropsType<number>> = ({ condition }) => {
  const location = useLocation()
  const role: RoleEnum = useAppSelector((state) => state.user.role)

  if (condition === RoleEnum.ALL || condition === role) {
    return <Outlet />
  }

  if (role === RoleEnum.UNAUTHORIZED) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return <Navigate to={'/'} state={{ from: location }} />
}

export default AuthHoc
