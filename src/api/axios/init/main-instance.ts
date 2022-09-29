import axios from "axios";
import axiosOnfig from "../../../config/axiosСonfig";
import errors, {IErrors} from "./errors";

const mainInstance = axios.create({
    baseURL: axiosOnfig.baseUrl,
    headers: axiosOnfig.baseHeaders,
    withCredentials: axiosOnfig.withCredentials
})

mainInstance.interceptors.response.use((response) => response, (error => {
    return Promise.reject(() => {
        const status:keyof IErrors = error.response.status;
        const callBack:() => string = errors[status];
    })
}))

export default mainInstance;
