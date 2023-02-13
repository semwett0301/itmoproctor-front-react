import React, {FC} from 'react'
import {Navigate, Outlet, useLocation, useOutletContext} from 'react-router-dom'
import {RoleEnum} from '../../config/router/authСonfig'
import {HocPropsType} from '../../ts/types/HocPropsType'
import {useAppSelector} from '../../hooks/store/useAppSelector';

const ErrorHoc: FC<HocPropsType<RoleEnum>> = () => {
  const location = useLocation()
  const context = useOutletContext()
  const role: RoleEnum = useAppSelector((state) => state.user.role)

  if (role !== RoleEnum.UNAUTHORIZED) {
    return <Outlet context={context}/>
  }

  return <Navigate to={'/dist'} replace={true} state={{ from: location }} />
}

export default ErrorHoc
