import {IRoute} from '../interfaces/IRoute';

export type HocPropsType<T> = {
  condition?: T,
  route: IRoute
}
