import {IRoute} from '../../ts/interfaces/IRoute'
import Admin from '../../components/admin/Admin'
import Schedule from '../../components/admin/Schedule/Schedule'
import Courses from '../../components/admin/Courses/Courses'
import Users from '../../components/admin/Users/Users'
import Organizations from '../../components/admin/Organizations/Organizations'
import UserExams from '../../components/admin/UserExams/UserExams'
import ExamProtocol from '../../components/admin/ExamProtocol/ExamProtocol'
import NotFound from '../../components/shared/errors/NotFound/NotFound'
import Exams from '../../components/admin/Exams/Exams'
import Maintenance from '../../components/admin/Maintenance/Maintenance'
import {AdminSubRoles} from '../../config/router/authСonfig'
import {request} from '../../api/axios/request'
import {getShortName} from '../../utils/common/nameHelper'

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 1, path: 'exams', title: 'Экзамены', component: Exams },
      {
        id: 21,
        path: 'userExams/:id',
        title: (id: string) =>
          request.users
            .getUser(id)
            .then(({ data }) => getShortName(data.firstname, data.middlename, data.lastname)),
        component: UserExams
      },
      {
        id: 22,
        path: 'exam/:id',
        type: 'exam',
        title: (id: string) =>
          request.expert.exams
            .getExam(id)
            .then(({ data }) =>
              getShortName(data.student.firstname, data.student.middlename, data.student.lastname)
            ),
        component: ExamProtocol
      },
      { id: 2, path: 'users', title: 'Пользователи', component: Users },
      { id: 3, path: 'schedule', title: 'Расписание', component: Schedule },
      { id: 4, path: 'courses', title: 'Курсы', component: Courses },
      { id: 6, path: 'organizations', title: 'Организации', component: Organizations },
      { id: 7, path: 'about', title: 'О системе', component: NotFound },
      {
        id: 8,
        path: 'maintenance',
        title: 'Тех. работы',
        component: Maintenance,
        subRole: AdminSubRoles.SYSTEM
      },
      { id: 999, path: '*', component: NotFound }
    ]
  }
]
