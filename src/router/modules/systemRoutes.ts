import { IRoute } from '../../ts/interfaces/IRoute'
import Admin from '../../components/admin/Admin'
import Maintenance from '../../components/admin/Maintenance/Maintenance'

export const systemRoutes: IRoute[] = [
  {
    id: 1,
    path: '/admin',
    component: Admin,
    children: [{ id: 1, path: 'maintenance', component: Maintenance }]
  }
]
