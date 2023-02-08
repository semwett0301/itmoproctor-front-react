import {DefaultItem} from '@consta/uikit/Select'

const documents: DefaultItem[] = [
  { id: 'passport', label: 'Паспорт' },
  { id: 'internationalPassport', label: 'Заграничный паспорт' },
  { id: 'foreignDocument', label: 'Иностранный документ' },
  { id: 'seamanPassport', label: 'Паспорт моряка' },
  { id: 'birthCertificate', label: 'Свидетельство о рождении (для лиц до 14 лет)' },
  { id: 'militaryID', label: 'Военный билет' },
  {
    id: 'temporaryAsylum',
    label: 'Свидетельство о предоставлении временного убежища на территории РФ'
  }
]

export default documents

export const getDocumentTypeItem = (id: string): DefaultItem | null =>
  documents.find((item) => item.id === id) ?? null
