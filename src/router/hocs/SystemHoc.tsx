import React, { FC } from 'react'
import { Navigate, useLocation, Outlet, Location, useOutletContext } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { RoleEnum } from '../../config/authСonfig'
import { HocPropsType } from '../../ts/types/HocPropsType'
import { mainRoutesConfig } from '../../config/mainRoutesConfig'

const ServiceHoc: FC<HocPropsType<RoleEnum>> = () => {
  const system: boolean | undefined = useAppSelector((state) => state.user.system)
  const location: Location = useLocation()
  const context = useOutletContext()

  if (system) {
    return <Outlet context={context} />
  }

  return <Navigate to={'/'} replace={true} state={{ from: location }} />
}

export default ServiceHoc
