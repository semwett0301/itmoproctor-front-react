import {IRoute} from "../interfaces/IRoute";

export type HocData<T> = {
    key: number,
    condition?: T,
    routes: IRoute[]
}
