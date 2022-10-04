import {FC} from "react";

export interface IRoute {
    id: number;
    path: string;
    component: FC;
    children?: IRoute[];
}
