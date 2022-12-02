import { DefaultItem } from '@consta/uikit/Select'

const userStatuses: DefaultItem[] = [
  { id: 'false', label: 'Заблокирован' },
  { id: 'true', label: 'Активен' }
]

export default userStatuses

export const getUserStatusItem = (id: string): DefaultItem =>
  userStatuses.find((item) => item.id === id) || userStatuses[1]
