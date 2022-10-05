import {AxiosInstance, AxiosResponse} from "axios";
import {IUser} from "../../../ts/interfaces/IUser";

export interface IProfileAxios {
    getProfileById: (userId: string) => Promise<AxiosResponse<IUser>>,
    getProfileBySession: () => Promise<AxiosResponse<IUser>>,
    updateProfile: (userId: string, data: IUser) => Promise<AxiosResponse>
}

export default function (instance: AxiosInstance) {
    return {
        getProfileById(userId: string): Promise<AxiosResponse<IUser>> {
            return instance.get(`profile/${userId}`)
        },

        getProfileBySession(): Promise<AxiosResponse<IUser>> {
            return instance.get("profile");
        },

        updateProfile(userId: string, data: IUser): Promise<AxiosResponse> {
            return instance.put(`profile/${userId}`, data)
        }
    }
}
