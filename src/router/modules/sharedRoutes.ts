import {IRoute} from "../../ts/interfaces/IRoute";
import NotFound from "../../components/shared/NotFound";



export const sharedRoutes:IRoute[] = [
    {path: '/help', component: NotFound},
];
