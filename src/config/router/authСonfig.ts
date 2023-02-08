import {IUserApp} from '../../ts/interfaces/IUserApp';

export enum RoleEnum {
  ALL = 'ALL',
  UNAUTHORIZED = 'UNAUTHORIZED',
  STUDENT = 'STUDENT',
  PROCTOR = 'PROCTOR',
  ADMIN = 'ADMIN'
}

export enum ProviderEnum {
  LOCAL = 'local',
  OPENEDU = 'openedu'
}

type RolesToBackendConfig = {
  [key: number]: RoleEnum
}

// Соотношение кодов с бэкенда и ролей в приложении
export const rolesToBackendConfig: RolesToBackendConfig = {
  1: RoleEnum.STUDENT,
  2: RoleEnum.PROCTOR,
  3: RoleEnum.ADMIN
}

export enum AdminSubRoles {
  SYSTEM = 'SYSTEM'
}

export enum ProctorSubRoles {
  EXPERT = 'EXPERT'
}

export type SubRole = AdminSubRoles | ProctorSubRoles

type SubRolesMapToRolesConfig = {
  [key in RoleEnum]: Array<SubRole>
}

// конфиг для соотношения ролей и подролей
export const subRolesMapToRolesConfig: SubRolesMapToRolesConfig = {
  'ALL': [],
  'UNAUTHORIZED': [],
  'STUDENT': [],
  'PROCTOR': [ProctorSubRoles.EXPERT],
  'ADMIN': [AdminSubRoles.SYSTEM]
}

type SubRolesCallbackConfig = {
  [key in SubRole]: (user: IUserApp) => boolean
}

// конфиг для проверок у подролей\
export const subRolesCallbackConfig: SubRolesCallbackConfig = {
  'SYSTEM': user => user.system ?? false,
  'EXPERT': user => user.expert ?? false
}


