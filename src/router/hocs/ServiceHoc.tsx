import React, {FC} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {RoleEnum} from '../../config/router/authСonfig'
import {HocPropsType} from '../../ts/types/HocPropsType'
import {mainRoutesConfig} from '../../config/router/mainRoutesConfig'
import {useAppSelector} from '../../hooks/store/useAppSelector';

const ServiceHoc: FC<HocPropsType<RoleEnum>> = () => {
  const location = useLocation()
  const role: RoleEnum = useAppSelector((state) => state.user.role)

  return <Navigate to={mainRoutesConfig[role]} replace={true} state={{ from: location }} />
}

export default ServiceHoc
