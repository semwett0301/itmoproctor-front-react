import mainInstance from './init/mainInstance'
import auth, { IAuthAxios } from './modules/auth'
import profile, { IProfileAxios } from './modules/profile'
import exams, { IExamsAxios } from './modules/admin/exams'

export interface IRequestAxios {
  auth: IAuthAxios
  profile: IProfileAxios
  exam: IExamsAxios
}

export const request: IRequestAxios = {
    auth: auth(mainInstance),
    profile: profile(mainInstance),
    exam: exams(mainInstance)
}
