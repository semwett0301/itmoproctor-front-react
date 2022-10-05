import {IRoute} from "../../ts/interfaces/IRoute";
import NotFound from "../../components/shared/errors/NotFound";
import Exams from "../../components/admin/exams/Exams";

export const adminRoutes:IRoute[] = [
    {id: 1, path: '/admin', component: Exams},
];
