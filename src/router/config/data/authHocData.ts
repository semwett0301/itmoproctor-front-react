import {RoleEnum} from "../../../config/authСonfig";
import {sharedRoutes} from "../../modules/sharedRoutes";
import {unauthorizedRoutes} from "../../modules/unauthorizedRoutes";
import {HocData} from "../../../ts/types/HocData";

const authHocData: HocData<RoleEnum>[] = [
    {
        key: 1,
        condition: RoleEnum.ALL,
        routes: sharedRoutes
    },
    {
        key: 2,
        condition: RoleEnum.UNAUTHORIZED,
        routes: unauthorizedRoutes
    }
]

export default authHocData;
