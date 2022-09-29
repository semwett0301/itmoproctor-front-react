import {AxiosRequestHeaders} from "axios";

interface IAxiosConfig {
    baseUrl: string,
    baseHeaders: AxiosRequestHeaders,
    withCredentials: boolean
}

const axiosOnfig: IAxiosConfig = {
    baseUrl: "http://localhost:3000",
    baseHeaders: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}

export default axiosOnfig
