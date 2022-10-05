import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {IRoute} from "../ts/interfaces/IRoute";
import {IHocConfig, IHocParameter} from "../ts/interfaces/IHocConfig";
import routerHocConfig from "../config/routerHocConfig";
import {RoleEnum} from "../config/authСonfig";

const MainRouter: FC = () => {

    const hocHelper = (config: IHocConfig<any>) => {
        const data = config.data;

        return (
            <Route key={config.id}>
                {data.map(elem => {
                    if (Array.isArray(config.value)) {
                        const hocWrapper = (hocs: IHocParameter<RoleEnum>[]) => {
                            if (hocs.length !== 0) {
                                const hocParameter: IHocParameter<RoleEnum>= hocs[0]
                                hocs = hocs.slice(1, hocs.length)
                                return (
                                    <Route key={hocParameter.id} element={<hocParameter.hoc condition={elem.condition}/>}>
                                        {hocWrapper(hocs)}
                                    </Route>
                                )
                            } else {
                                return (
                                    elem.routes.map(route => routeHelper(route))
                                )
                            }
                        }

                        return hocWrapper(config.value)
                    } else {
                        return (
                            <Route key={config.value.id} element={<config.value.hoc condition={elem.condition}/>}>
                                {
                                    elem.routes.map(route => routeHelper(route))
                                }
                            </Route>
                        )
                    }
                })}
            </Route>
        )
    }

    const routeHelper = (obj: IRoute) => {
        if (obj.children) {
            return (
                <Route key={obj.id} path={obj.path} element={obj.component ? <obj.component/> : ''}>
                    {
                        obj.children.map((item: IRoute) => routeHelper(item))
                    }
                </Route>

            )
        }
        return <Route key={obj.id} path={obj.path} element={obj.component ? <obj.component/> : ''}/>
    }

    return (
        <Routes>
            {routerHocConfig.map(elem => hocHelper(elem))}
        </Routes>
    )
};

export default MainRouter;
