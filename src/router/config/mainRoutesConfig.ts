import {RoleEnum} from "../../config/authСonfig";


type MainRoutesConfig = {
    [key in RoleEnum]: string
}

export const mainRoutesConfig: MainRoutesConfig = {
    "-1": "/",
    0: "/login",
    1: "/student",
    2: "/proctor",
    3: "/admin"
}

