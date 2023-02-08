import { DefaultItem } from '@consta/uikit/Select'

const genders: DefaultItem[] = [
  { id: 'male', label: 'Мужской' },
  { id: 'female', label: 'Женский' }
]

export const getGender = (id: string): DefaultItem =>
  genders.find((item) => item.id === id) ?? genders[0]
export default genders
