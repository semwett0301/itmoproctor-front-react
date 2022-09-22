import {AxiosInstance} from "axios";
import {ILogin} from "../../../ts/interfaces/ILogin";

export default function (instance: AxiosInstance){
    return {
        login(data: ILogin) {
            return instance.post('/profile', data)
        },
        logout(user_id: string) {
            return instance.delete(`/profile/${user_id}`)
        }
    }
}
