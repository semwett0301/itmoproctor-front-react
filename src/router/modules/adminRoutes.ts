import { IRoute } from '../../ts/interfaces/IRoute'
import Exams from '../../components/admin/Exams/Exams'
import Admin from '../../components/admin/Admin'
import NotFound from '../../components/shared/errors/NotFound/NotFound'
import Users from '../../components/admin/users/Users'

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 1, path: 'Exams', component: Exams },
      { id: 2, path: 'users', component: Users },
      { id: 3, path: '*', component: NotFound }
    ]
  }
]
