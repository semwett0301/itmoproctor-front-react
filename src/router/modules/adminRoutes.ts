import { IRoute } from '../../ts/interfaces/IRoute'
import Admin from '../../components/admin/Admin'
import Schedule from '../../components/admin/Schedule/Schedule'
import Courses from '../../components/admin/Courses/Courses'
import Maintenance from '../../components/admin/Maintenance/Maintenance'
import Users from '../../components/admin/Users/Users'
import Organizations from '../../components/admin/Organizations/Organizations'
import NotFound from '../../components/shared/errors/NotFound/NotFound'
import Exams from '../../components/admin/Exams/Exams'
import UserExams from '../../components/admin/UserExams/UserExams'

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 1, path: 'exams', component: Exams },
      { id: 21, path: 'exams/:id', component: UserExams },
      { id: 21, path: 'exam/:id', component: NotFound },
      { id: 2, path: 'users', component: Users },
      { id: 3, path: 'schedule', component: Schedule },
      { id: 4, path: 'courses', component: Courses },
      { id: 5, path: 'maintenance', component: Maintenance },
      { id: 6, path: 'organizations', component: Organizations }
    ]
  }
]
