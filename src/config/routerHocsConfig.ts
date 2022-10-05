import AuthHoc from "../router/hocs/AuthHoc";
import {RoleEnum} from "./authСonfig";
import {IHocConfig} from "../ts/interfaces/IHocConfig";
import ServiceHoc from "../router/hocs/ServiceHoc";
import {sharedRoutes} from "../router/modules/sharedRoutes";
import {unauthorizedRoutes} from "../router/modules/unauthorizedRoutes";
import {studentRoutes} from "../router/modules/studentRoutes";
import {serviceRoutes} from "../router/modules/serviceRoutes";
import {adminRoutes} from "../router/modules/adminRoutes";


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
        },
        {
            id: 4,
            condition: RoleEnum.ADMIN,
            routes: adminRoutes
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
const routerHocsConfig: IHocConfig<any>[] = [
    auth,
    service
]

export default routerHocsConfig;
