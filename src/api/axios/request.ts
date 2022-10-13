import mainInstance from './init/mainInstance'
import auth, { IAuthAxios } from './modules/auth'
import profile, { IProfileAxios } from './modules/profile'
import { AppDispatch } from '../../store'
import exams, { IExamsAxios } from './modules/admin/exams'

export interface IRequestAxios {
  auth: IAuthAxios
  profile: IProfileAxios
  exam: IExamsAxios
}

export function request(dispatch: AppDispatch): IRequestAxios {
  return {
    auth: auth(mainInstance(dispatch)),
    profile: profile(mainInstance(dispatch)),
    exam: exams(mainInstance(dispatch))
  }
}
