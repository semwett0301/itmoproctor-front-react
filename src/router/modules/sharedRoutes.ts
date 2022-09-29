import {IRoute} from "../../ts/interfaces/IRoute";
import NotFound from "../../components/shared/NotFound";

export const sharedRoutes:IRoute[] = [
    {id: 1, path: '*', component: NotFound},
];
