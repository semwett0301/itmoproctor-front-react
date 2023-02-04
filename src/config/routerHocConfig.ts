import AuthHoc from '../router/hocs/AuthHoc'
import {RoleEnum} from './authСonfig'
import {IHocConfig} from '../ts/interfaces/IHocConfig'
import ServiceHoc from '../router/hocs/ServiceHoc'
import {serviceRoutes} from '../router/modules/serviceRoutes'
import {HocConfig} from '../ts/types/HocConfig'
import ErrorHoc from '../router/hocs/ErrorHoc'
import {errorRoutes} from '../router/modules/errorRoutes'
import {rolesToRoutesConfig} from '../utils/userRoutes';

// Генерирование хок-конфигов в соответствии с конкретным условием (RoleEnum, boolean, etc)
const auth: IHocConfig<RoleEnum> = {
  id: 1,
  value: {
    hoc: AuthHoc
  },
  data: [
    {
      id: 1,
      condition: RoleEnum.ALL,
      routes: rolesToRoutesConfig[RoleEnum.ALL]
    },
    {
      id: 2,
      condition: RoleEnum.UNAUTHORIZED,
      routes: rolesToRoutesConfig[RoleEnum.UNAUTHORIZED]
    },
    {
      id: 3,
      condition: RoleEnum.STUDENT,
      routes: rolesToRoutesConfig[RoleEnum.STUDENT]
    },
    {
      id: 4,
      condition: RoleEnum.ADMIN,
      routes: rolesToRoutesConfig[RoleEnum.ADMIN]
    }
  ]
}

const service: IHocConfig<RoleEnum> = {
  id: 2,
  value: {
    hoc: ServiceHoc
  },
  data: [
    {
      id: 1,
      routes: serviceRoutes
    }
  ]
}

const error: IHocConfig<RoleEnum> = {
  id: 3,
  value: {
    hoc: ErrorHoc
  },
  data: [
    {
      id: 1,
      routes: errorRoutes
    }
  ]
}

// Сбор всех хок-конфигов
const routerHocConfig: HocConfig[] = [auth, service, error]

export default routerHocConfig
