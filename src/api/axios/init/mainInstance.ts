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
        dispatch(isLoadedActionCreator());
        const status: number = error.response.status;
        if (status in Object.keys(errors)) errors[status](dispatch, navigate);
        return Promise.reject(`${status} error`)
    }))

    return mainInstance;
};
