import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {sharedRoutes} from "./modules/sharedRoutes";
import {IRoute} from "../ts/interfaces/IRoute";
import AuthHoc from "./hocs/AuthHoc";
import {RoleNumbers} from "../ts/enums/RoleNumbers";
import {unauthorizedRoutes} from "./modules/unauthorizedRoutes";

const setRoles = (roles: RoleNumbers[], routes: IRoute[]): IRoute[] => {
    routes.map(route => {
        route.roles = roles
    })

    return routes
}

const routes = [
    ...sharedRoutes,
    ...unauthorizedRoutes
]

const MainRouter: FC = () => {
    const routeHelper = (obj: IRoute) => {
        const AuthComponent = <AuthHoc requiredRoles={obj.roles}>
            <obj.component/>
        </AuthHoc>

        if (obj.children) {
            return (
                    <Route path={obj.path} element={AuthComponent} key={obj.path}>
                        {
                            obj.children.map((item: IRoute) => routeHelper(item))
                        }
                    </Route>

            )
        }
        return <Route path={obj.path} element={AuthComponent} key={obj.path}/>
    }

    return (
        <Routes>
            {routes.map(elem => routeHelper(elem))}
        </Routes>
    )
};

export default MainRouter;
