import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {guestRoutes, IRoute} from "./modules/sharedRoutes";

const MainRouter:FC = () => {

    const routeHelper = (obj:IRoute) => {
        console.log(obj);

        if (obj.children) {
            return (
                <Route path={obj.path} element={<obj.component/>} key={obj.path}>
                    {
                        obj.children.map((item: any) => routeHelper(item))
                        // <Route path={obj.children[0].path} element={obj.children[0].component} key={obj.children[0].path}/>
                    }
                </Route>
            )
        }

        else{
            return <Route path={obj.path} element={<obj.component/>} key={obj.path}/>
        }

    }

    return (
        <Routes>
            {guestRoutes.map(elem => routeHelper(elem))}
        </Routes>
    )
};

export default MainRouter;