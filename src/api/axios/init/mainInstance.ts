import axios from "axios";
import axiosConfig from "../../../config/axiosСonfig";
import errors, {IErrors} from "./errors";
import {AppDispatch} from "../../../store";
import {NavigateFunction} from "react-router-dom";
import {isLoadedActionCreator, isLoadingActionCreator} from "../../../store/reducers/isLoading/isLoadingActionCreators";

export default function (dispatch: AppDispatch, navigate: NavigateFunction) {
    const mainInstance = axios.create({
        baseURL: axiosConfig.baseUrl,
        headers: axiosConfig.baseHeaders,
        withCredentials: axiosConfig.withCredentials
    })

    mainInstance.interceptors.request.use((request) => {
        dispatch(isLoadingActionCreator())
        return request;
    })

    mainInstance.interceptors.response.use((response) => {
        dispatch(isLoadedActionCreator())
        return response
    }, (error => {
        dispatch(isLoadedActionCreator())
        return Promise.reject(() => {
            const status: keyof IErrors = error.response.status;
            errors[status](dispatch, navigate)
        })
    }))

    return mainInstance;
};
