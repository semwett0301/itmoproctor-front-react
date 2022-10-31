import {IRoute} from '../../ts/interfaces/IRoute';
import NotFound from '../../components/shared/errors/NotFound/NotFound';

export const errorRoutes: IRoute[] = [
  {id: 1, path: '*', component: NotFound}
]
