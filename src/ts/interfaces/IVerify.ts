export interface IAttach {
  filename: string
  fileId: string
  description: string
  // ISO Date
  created: string
}
export interface IVerify {
  _id: string
  submit: boolean
  firstname: string
  lastname: string
  middlename: string
  gender: string
  birthday: string
  citizenship: string
  documentType: string
  documentNumber: string
  documentIssueDate: string
  hash: string
  student: string
  exam: string
  address: string
  description: string
  attach: IAttach[]
  created: Date
  __v: number
}
