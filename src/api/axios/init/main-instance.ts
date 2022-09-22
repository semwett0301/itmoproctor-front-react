import axios from "axios";
import axiosConfig from "../../../config/axios-config";
import errors, {IErrors} from "./errors";

const mainInstance = axios.create({
    baseURL: axiosConfig.baseUrl,
    headers: axiosConfig.baseHeaders,
    withCredentials: axiosConfig.withCredentials
})

mainInstance.interceptors.response.use((response) => response, (error => {
    return Promise.reject(() => {
        const status:keyof IErrors = error.response.status;
        const callBack:() => string = errors[status];
    })
}))

export default mainInstance;
