export interface IResponseArray<T> {
  total: number
  rows: T[]
  organizations?: string[]
}
