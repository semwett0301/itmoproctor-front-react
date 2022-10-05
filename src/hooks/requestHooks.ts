import {IRequest, request} from "../api/axios/request";
import {useAppDispatch} from "./reduxHooks";
import {useNavigate} from "react-router-dom";

export const useRequest: () => IRequest = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return request(dispatch, navigate);
}
