import AuthPage from "../../components/unauthorized/AuthPage/AuthPage";
import {IRoute} from "../../ts/interfaces/IRoute";
import Exams from "../../components/admin/exams/Exams";

export const unauthorizedRoutes:IRoute[] = [
    {id: 1, path: '/login', component: AuthPage},
    {id:2, path: '/admin', component: Exams}
];

