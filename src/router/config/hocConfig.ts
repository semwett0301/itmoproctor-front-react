import AuthHoc from "../hocs/AuthHoc";
import {RoleEnum} from "../../config/authСonfig";
import {IHocConfig} from "../../ts/interfaces/IHocConfig";
import ServiceHoc from "../hocs/ServiceHoc";
import {sharedRoutes} from "../modules/sharedRoutes";
import {unauthorizedRoutes} from "../modules/unauthorizedRoutes";
import {studentRoutes} from "../modules/studentRoutes";
import {serviceRoutes} from "../modules/serviceRoutes";


// Генерирование хок-конфигов в соответствии с конкретным условием (RoleEnum, boolean, etc)
const auth: IHocConfig<RoleEnum> = {
    id: 1,
    value: {
        id: 1,
        hoc: AuthHoc
    },
    data: [
        {
            id: 1,
            condition: RoleEnum.ALL,
            routes: sharedRoutes
        },
        {
            id: 2,
            condition: RoleEnum.UNAUTHORIZED,
            routes: unauthorizedRoutes
        },
        {
            id: 3,
            condition: RoleEnum.STUDENT,
            routes: studentRoutes
        }
    ]
}

const service: IHocConfig = {
    id: 2,
    value: {
        id: 1,
        hoc: ServiceHoc
    },
    data: [
        {
            id: 1,
            routes: serviceRoutes
        }
    ]
}

// Сбор всех хок-конфигов
const hocConfig: IHocConfig<any>[] = [
    auth,
    service
]

export default hocConfig;
