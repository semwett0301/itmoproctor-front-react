import {IRoute} from '../../ts/interfaces/IRoute'
import Installing from '../../components/unauthorized/Installing/Installing';
import {request} from '../../api/axios/request';

export const sharedRoutes: IRoute[] = [
  {
    id: 1, path: '/dist', component: Installing, loader: async () => {
      return await request.dist.getInfo().then(r => {
        return r.data
      })
    }
  },
]
