import AuthPage from "../../components/unauthorized/AuthPage/AuthPage";
import NotFound from "../../components/shared/NotFound";
import {FC} from "react";
import Exams from "../../components/admin/exams/Exams";

export interface IRoute {
    path: string;
    component: FC;
    children?: IRoute[];
}

export const guestRoutes:IRoute[] = [
    {path:'admin', component: Exams},
    {path: 'help', component: NotFound},
    {path: '*', component: AuthPage}
];


