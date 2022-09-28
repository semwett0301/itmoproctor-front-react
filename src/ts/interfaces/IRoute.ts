import {FC} from "react";
import {RoleNumbers} from "../enums/RoleNumbers";

export interface IRoute {
    path: string;
    component: FC;
    roles?: RoleNumbers[];
    children?: IRoute[];
}
