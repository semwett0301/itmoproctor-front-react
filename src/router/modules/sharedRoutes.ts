import AuthPage from "../../components/shared/AuthPage/AuthPage";
import NotFound from "../../components/shared/NotFound";
import React from "react";

interface IRoutes {
    path: string;
    component: React.ComponentType;
}

export const guestRoutes:IRoutes[] = [
    {path: 'help', component: AuthPage},
    {path: '*', component: AuthPage}
];


