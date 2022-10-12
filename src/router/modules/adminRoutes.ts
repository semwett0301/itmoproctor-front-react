import { IRoute } from '../../ts/interfaces/IRoute'
import Exams from '../../components/admin/exams/Exams'
import Admin from '../../components/admin/Admin'
import NotFound from '../../components/shared/errors/NotFound/NotFound'

export const adminRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [
      { id: 2, path: 'exams', component: Exams },
      { id: 3, path: 'exams:id', component: NotFound },
      { id: 1.1, path: '*', component: NotFound }
    ]
  }
]
