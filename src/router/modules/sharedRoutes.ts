import {IRoute} from '../../ts/interfaces/IRoute'
import NotFound from '../../components/shared/errors/NotFound/NotFound'
import Installing from '../../components/unauthorized/Installing/Installing';
import {request} from '../../api/axios/request';

export const sharedRoutes: IRoute[] = [
  {id: 1, path: '*', component: NotFound},
  {
    id: 2, path: '/dist', component: Installing, loader: async () => {
      return await request.dist.getInfo().then(r => {
        return r.data
      })
    }
  },
]
