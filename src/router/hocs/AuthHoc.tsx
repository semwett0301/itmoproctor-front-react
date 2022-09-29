import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHooks";
import {Navigate} from "react-router-dom";
import {RoleEnum} from "../../config/authСonfig";
import {HocProps} from "../../ts/types/HocProps";

const AuthHoc: FC<HocProps<RoleEnum>> = ({condition}) => {

    const role: RoleEnum = useAppSelector(state => state.user.role)

    if (condition === RoleEnum.ALL || condition === role) {
        return <Outlet/>
    }

    return <Navigate to={"/help"}/>
}

export default AuthHoc;
