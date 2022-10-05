import {IRoute} from "../../ts/interfaces/IRoute";
import Exams from "../../components/admin/exams/Exams";
import Admin from "../../components/admin/Admin";

export const adminRoutes:IRoute[] = [
    {id: 1, path: '/admin', component: Admin, children:[
            {id: 2, path: 'exams', component: Exams}
        ]},
];
