export interface IArchive {
  os: string,
  arch: number,
  path: string,
  md5: string
}

export interface IVersion {
  version: string,
  date: Date,
  archives: IArchive[]
}
