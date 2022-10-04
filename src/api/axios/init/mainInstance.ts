import axios from "axios";
import axiosConfig from "../../../config/axiosСonfig";
import errors, {IErrors} from "./errors";
import {AppDispatch} from "../../../store";
import {NavigateFunction} from "react-router-dom";

export default function (dispatch: AppDispatch, navigate: NavigateFunction) {
    const mainInstance = axios.create({
        baseURL: axiosConfig.baseUrl,
        headers: axiosConfig.baseHeaders,
        withCredentials: axiosConfig.withCredentials
    })

    mainInstance.interceptors.response.use((response) => response, (error => {
        return Promise.reject(() => {
            const status: keyof IErrors = error.response.status;
            errors[status](dispatch, navigate)
        })
    }))

    return mainInstance;
};
