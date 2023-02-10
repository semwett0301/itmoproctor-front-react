import auth from './modules/auth'
import profile from './modules/profile'
import exams from './modules/admin/exams'
import dist from './modules/dist'
import mainInstance from './init/mainInstance'
import organizations from './modules/admin/organizations'
import users from './modules/admin/users'
import schedule from './modules/admin/schedule'
import courses from './modules/admin/сourses'
import maintenance from './modules/admin/maintenance'
import studentExams, {IStudentExamsAxios} from './modules/student/studentExams'
import ExpertExams, {IExpertExamsAxios} from './modules/expert/exams'
import network from './modules/network'
import chat, {IStudentChatAxios} from './modules/student/chat'

export interface IStudentRequestAxios {
  exams: IStudentExamsAxios
  chat: IStudentChatAxios
}

export interface IExpertRequestAxios {
  exams: IExpertExamsAxios
}

export const request = {
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
  network: network(mainInstance),
}
