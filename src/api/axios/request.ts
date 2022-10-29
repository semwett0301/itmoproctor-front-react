import auth, { IAuthAxios } from './modules/auth'
import profile, { IProfileAxios } from './modules/profile'
import exams, { IExamsAxios } from './modules/admin/exams'
import dist, { IDistAxios } from './modules/dist'
import mainInstance from './init/mainInstance'
import organizations, { IOrganizationsAxios } from './modules/admin/organizations'
import users, { IUsersAxios } from './modules/admin/users'

export interface IRequestAxios {
  auth: IAuthAxios
  profile: IProfileAxios
  exam: IExamsAxios
  users: IUsersAxios
  dist: IDistAxios
  organizations: IOrganizationsAxios
}

export const request: IRequestAxios = {
  auth: auth(mainInstance),
  profile: profile(mainInstance),
  exam: exams(mainInstance),
  users: users(mainInstance),
  dist: dist(mainInstance),
  organizations: organizations(mainInstance)
}
