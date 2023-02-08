import auth, { IAuthAxios } from './modules/auth'
import profile, { IProfileAxios } from './modules/profile'
import exams, { IExamsAxios } from './modules/admin/exams'
import dist, { IDistAxios } from './modules/dist'
import mainInstance from './init/mainInstance'
import organizations, { IOrganizationsAxios } from './modules/admin/organizations'
import users, { IUsersAxios } from './modules/admin/users'
import schedule, { IScheduleAxios } from './modules/admin/schedule'
import courses, { ICoursesAxios } from './modules/admin/сourses'
import maintenance, { IMaintenanceAxios } from './modules/admin/maintenance'
import studentExams, { IStudentExamsAxios } from './modules/student/studentExams'
import ExpertExams, { IExpertExamsAxios } from './modules/expert/exams'
import network, { INetworkAxios } from './modules/network'
import chat, { IStudentChatAxios } from './modules/student/chat'

export interface IStudentRequestAxios {
  exams: IStudentExamsAxios
  chat: IStudentChatAxios
}

export interface IExpertRequestAxios {
  exams: IExpertExamsAxios
}

export interface IRequestAxios {
  auth: IAuthAxios
  profile: IProfileAxios
  exam: IExamsAxios
  users: IUsersAxios
  schedule: IScheduleAxios
  courses: ICoursesAxios
  maintenance: IMaintenanceAxios
  dist: IDistAxios
  organizations: IOrganizationsAxios
  student: IStudentRequestAxios
  expert: IExpertRequestAxios
  network: INetworkAxios
}

export const request: IRequestAxios = {
  auth: auth(mainInstance),
  profile: profile(mainInstance),
  exam: exams(mainInstance),
  users: users(mainInstance),
  schedule: schedule(mainInstance),
  courses: courses(mainInstance),
  maintenance: maintenance(mainInstance),
  dist: dist(mainInstance),
  organizations: organizations(mainInstance),

  student: {
    exams: studentExams(mainInstance),
    chat: chat(mainInstance)
  },
  expert: {
    exams: ExpertExams(mainInstance)
  },
  network: network(mainInstance)
}
