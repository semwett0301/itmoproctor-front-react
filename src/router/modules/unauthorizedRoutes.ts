import AuthPage from "../../components/unauthorized/AuthPage/AuthPage";
import {IRoute} from "../../ts/interfaces/IRoute";

export const unauthorizedRoutes:IRoute[] = [
    {id: 1, path: '/login', component: AuthPage}
];

