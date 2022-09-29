import {FC} from "react";
import {RoleEnum} from "../../config/authСonfig";

export interface IRoute {
    id: number;
    path: string;
    component: FC;
    children?: IRoute[];
}
