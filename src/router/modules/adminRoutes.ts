import { IRoute } from '../../ts/interfaces/IRoute'
import Admin from '../../components/admin/Admin'
import Schedule from '../../components/admin/Schedule/Schedule'
import Courses from '../../components/admin/Courses/Courses'
import Users from '../../components/admin/Users/Users'
import Organizations from '../../components/admin/Organizations/Organizations'
import UserExams from '../../components/admin/UserExams/UserExams'
import ExamProtocol from '../../components/admin/ExamProtocol/ExamProtocol'
import NotFound from '../../components/shared/errors/NotFound/NotFound'
import Exams from '../../components/admin/Exams/Exams'

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 1, path: 'exams', component: Exams },
      { id: 21, path: 'userExams/:id', component: UserExams },
      { id: 22, path: 'exam/:id', component: ExamProtocol },
      { id: 2, path: 'users', component: Users },
      { id: 3, path: 'schedule', component: Schedule },
      { id: 4, path: 'courses', component: Courses },
      { id: 6, path: 'organizations', component: Organizations },
      { id: 7, path: 'about', component: NotFound },
      { id: 999, path: '*', component: NotFound }
    ]
  }
]
