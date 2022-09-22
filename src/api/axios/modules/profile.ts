import {AxiosInstance} from "axios";
import {IUser} from "../../../ts/interfaces/IUser";

export default function (instance: AxiosInstance){
    return {
        async getProfileById(user_id: string) {
            return instance.get(`profile/${user_id}`)
        },

        getProfileBySession() {
            return instance.get("profile");
        },

        updateProfile(user_id: string, data: IUser) {
            return instance.put(`profile/${user_id}`, data)
        }
    }
}
