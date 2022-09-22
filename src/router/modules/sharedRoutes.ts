import AuthPage from "../../components/shared/AuthPage/AuthPage";
import NotFound from "../../components/shared/NotFound";
import React, {FC} from "react";

export interface IRoute {
    path: string;
    component: FC;
    children?: IRoute[];
}

export const guestRoutes:IRoute[] = [
    {path: 'help', component: AuthPage},
    {path: '*', component: AuthPage}
];


