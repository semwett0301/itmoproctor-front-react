import {DefaultItem} from '@consta/uikit/Select'

const examTypes: DefaultItem[] = [
  { id: 'true', label: 'Асинхронный' },
  { id: 'false', label: 'Синхронный' }
]

export const examTypesObj: { [index: string]: DefaultItem } = {
  true: { id: 'true', label: 'Асинхронный' },
  false: { id: 'false', label: 'Синхронный' }
}

export default examTypes
