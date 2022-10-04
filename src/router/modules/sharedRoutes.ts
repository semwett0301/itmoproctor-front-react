import {IRoute} from "../../ts/interfaces/IRoute";
import AuthPage from "../../components/unauthorized/AuthPage/AuthPage";

export const sharedRoutes:IRoute[] = [
    {id: 1, path: '/login', component: AuthPage}
];