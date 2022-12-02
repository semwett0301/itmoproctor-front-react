export interface ICourse {
  _id: string
  accessAllowed: string[]
  courseCode: string
  sessionCode: string
}

export interface IGetCourse {
  _id: string
  organization: string
  courseCode: string
  sessionCode: string
  accessAllowed: string[]
  verifications: string[]
  updated: string
  __v?: number
}
