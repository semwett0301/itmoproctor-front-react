import AuthPage from "../../components/unauthorized/AuthPage/AuthPage";
import {IRoute} from "../../ts/interfaces/IRoute";
import {RoleNumbers} from "../../ts/enums/RoleNumbers";


export const unauthorizedRoutes:IRoute[] = [
    {path: '*', component: AuthPage, roles: [RoleNumbers.UNAUTHORIZED]}
];


