import {DefaultItem} from '@consta/uikit/__internal__/src/components/Combobox/helpers'

export type ResolutionsType = DefaultItem & { value: string | null }
const resolutions: ResolutionsType[] = [
  {
    id: 0,
    label: 'Принят',
    value: 'true'
  },
  {
    id: 1,
    label: 'Прерван',
    value: 'false'
  },
  {
    id: 2,
    label: 'Отсутствует',
    value: null
  }
]

export default resolutions
