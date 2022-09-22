import {AxiosRequestHeaders} from "axios";

interface IAxiosConfig {
    baseUrl: string,
    baseHeaders: AxiosRequestHeaders,
    withCredentials: boolean
}

const axiosConfig: IAxiosConfig = {
    baseUrl: "http://localhost:3000",
    baseHeaders: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}

export default axiosConfig