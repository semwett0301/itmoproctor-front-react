import { IRoute } from '../../ts/interfaces/IRoute'
import Admin from '../../components/admin/Admin'
import NotFound from '../../components/shared/errors/NotFound/NotFound'
import Exams from '../../components/admin/Exams/Exams'
import Users from '../../components/admin/Users/Users'
import Schedule from '../../components/admin/Schedule/Schedule'
import Courses from '../../components/admin/Courses/Courses'

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 1, path: 'exams', component: Exams },
      { id: 2, path: 'users', component: Users },
      { id: 3, path: 'schedule', component: Schedule },
      { id: 4, path: 'courses', component: Courses },
      { id: 99, path: '*', component: NotFound }
    ]
  }
]
