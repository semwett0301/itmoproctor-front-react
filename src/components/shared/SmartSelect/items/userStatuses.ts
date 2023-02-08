import { DefaultItem } from '@consta/uikit/Select'

const userStatuses: DefaultItem[] = [
  { id: 'true', label: 'Активен' },
  { id: 'false', label: 'Заблокирован' }
]

export default userStatuses

export const getUserStatusItem = (id: string): DefaultItem =>
  userStatuses.find((item) => item.id === id) || userStatuses[1]
