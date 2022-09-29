import AuthHoc from "../hocs/AuthHoc";
import authHocData from "./data/authHocData";
import {RoleEnum} from "../../config/authСonfig";
import {IHocConfig} from "../../ts/interfaces/IHocConfig";


// Генерирование хок-конфигов в соответствии с конкретным условием (RoleEnum, boolean, etc)
const auth: IHocConfig<RoleEnum> = {
    hoc: AuthHoc,
    data: authHocData
}

// Сбор всех хок-конфигов
const hocConfig: IHocConfig<any>[] = [
    auth,
]

export default hocConfig;
