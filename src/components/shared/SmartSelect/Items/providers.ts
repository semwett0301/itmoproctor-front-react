import { DefaultItem } from '@consta/uikit/Select'

const providers: DefaultItem[] = [
  {
    label: 'Локальный',
    id: 'local'
  },
  {
    label: 'OpenEdu',
    id: 'openedu'
  }
]

export default providers

export const getProviderItem = (id: string): DefaultItem =>
  providers.find((item) => item.id === id) || providers[0]
