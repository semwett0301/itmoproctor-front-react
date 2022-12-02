import { DefaultItem } from '@consta/uikit/__internal__/src/components/Combobox/helpers'

const roles: DefaultItem[] = [
  {
    id: 1,
    label: 'Слушатель'
  },
  {
    id: 2,
    label: 'Проктор'
  },
  {
    id: 3,
    label: 'Администратор'
  }
]

export default roles

export const getRoleItem = (id: string): DefaultItem =>
  roles.find((item) => item.id === id) || roles[0]
