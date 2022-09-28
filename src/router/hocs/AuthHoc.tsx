import React, {FC, ReactNode} from 'react';
import {RoleNumbers} from "../../ts/enums/RoleNumbers";
import {useAppSelector} from "../../hooks/reduxHooks";
import {Navigate} from "react-router-dom";

interface IAuthHocProps {
    requiredRoles?: RoleNumbers[],
    children: ReactNode
}

const AuthHoc: FC<IAuthHocProps> = ({requiredRoles, children}) => {

    const role: RoleNumbers = useAppSelector(state => state.user.role)

    if (!requiredRoles || requiredRoles.includes(role)) {
        return (
            <>
                {children}
            </>
        )
    }

    return <Navigate to={"/help"}/>
}

export default AuthHoc;
