import React, {FC} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHooks";
import {RoleEnum} from "../../config/authСonfig";
import {HocPropsType} from "../../ts/types/HocPropsType";
import {mainRoutesConfig} from "../../config/mainRoutesConfig";

const ServiceHoc: FC<HocPropsType> = () => {
    const location = useLocation();
    const role: RoleEnum = useAppSelector(state => state.user.role)


    return <Navigate to={mainRoutesConfig[role]} replace={true} state={{from: location}}/>
}

export default ServiceHoc;
