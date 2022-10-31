import { IRoute } from '../../ts/interfaces/IRoute'
import Admin from '../../components/admin/Admin'
import Exams from '../../components/admin/Exams/Exams'
import Schedule from '../../components/admin/Schedule/Schedule'
import Users from '../../components/admin/users/Users';
import Organizations from '../../components/admin/Organizations/Organizations';

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 1, path: 'exams', component: Exams },
      { id: 2, path: 'users', component: Users },
      { id: 3, path: 'schedule', component: Schedule },
      { id: 4, path: 'organizations', component: Organizations}
    ]
  }
]
