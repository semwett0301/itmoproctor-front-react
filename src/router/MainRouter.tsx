import React, {FC, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {guestRoutes} from "./modules/sharedRoutes";

const MainRouter:FC = () => {

    const routeHelper = (obj:any) => {
        console.log(obj);

        if (obj.children) {
            return (
                <Route path={obj.path} element={obj.component} key={obj.path}>
                    {
                        obj.children.map((item: any) => routeHelper({obj: item}))
                        // <Route path={obj.children[0].path} element={obj.children[0].component} key={obj.children[0].path}/>
                    }
                </Route>
            )
        }

        else{
            return <Route path={obj.path} element={obj.component} key={obj.path}/>
        }

    }

    return (
        <Routes>
            {guestRoutes.map(elem => routeHelper({obj: elem}))}
        </Routes>
    )
};

export default MainRouter;