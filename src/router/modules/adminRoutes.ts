import { IRoute } from '../../ts/interfaces/IRoute'
import Exams from '../../components/admin/exams/Exams'
import Admin from '../../components/admin/Admin'
import NotFound from '../../components/shared/errors/NotFound/NotFound'
import Users from '../../components/admin/users/Users'

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 1, path: 'exams', component: Exams },
      { id: 2, path: 'users', component: Users },
      { id: 3, path: '*', component: NotFound }
    ]
  }
]
