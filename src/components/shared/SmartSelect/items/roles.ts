import {DefaultItem} from '@consta/uikit/__internal__/src/components/Combobox/helpers'
import {RoleEnum, backendToRolesConfig} from '../../../../config/router/authСonfig'

export interface IRoleSelectType extends DefaultItem {
  roleId: number
  expert: boolean | null
}
const roles: IRoleSelectType[] = [
  {
    id: 0,
    label: 'Слушатель',
    roleId: 1,
    expert: null
  },
  {
    id: 1,
    label: 'Проктор',
    roleId: 2,
    expert: false
  },
  {
    id: 2,
    label: 'Проктор(эксперт)',
    roleId: 2,
    expert: true
  },
  {
    id: 3,
    label: 'Администратор',
    roleId: 3,
    expert: null
  }
]

export default roles

export const getRoleItem = (
  id: keyof typeof backendToRolesConfig,
  expert: boolean | null
): DefaultItem => {
  const role = backendToRolesConfig[id]
  switch (role) {
    case RoleEnum.STUDENT:
      return roles[0]
    case RoleEnum.PROCTOR: {
      if (expert) return roles[2]
      else return roles[1]
    }
    case RoleEnum.ADMIN:
      return roles[3]
    default:
      return roles[0]
  }
}
