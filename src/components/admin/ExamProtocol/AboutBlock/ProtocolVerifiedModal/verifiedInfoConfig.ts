import { IVerify } from '../../../../../ts/interfaces/IVerify'
import { getGender } from '../../../../shared/SmartSelect/items/genders'
import { getCitizenItem } from '../../../../shared/SmartSelect/items/citizenships'
import { getDocumentTypeItem } from '../../../../shared/SmartSelect/items/documents'
import {getFullName} from '../../../../../utils/common/nameHelper';

interface VerifyInfo {
  title: string
  value?: string | null
}
export const getVerifyInfo = (verify: IVerify): VerifyInfo[] => {
  return [
    {
      title: 'ФИО',
      value: getFullName(verify.lastname, verify.firstname, verify.middlename)
    },
    {
      title: 'Пол',
      value: getGender(verify.gender).label
    },
    {
      title: 'Дата рождения',
      value: verify.birthday
    },
    {
      title: 'Гражданство',
      value: getCitizenItem(verify.citizenship)?.label
    },
    {
      title: 'Тип документа',
      value: getDocumentTypeItem(verify.documentType)?.label
    },
    {
      title: 'Номер документа',
      value: verify.documentNumber
    },
    {
      title: 'Дата выдачи',
      value: verify.documentIssueDate
    }
  ]
}
