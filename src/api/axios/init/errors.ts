import {dropUserActionCreator} from "../../../store/reducers/userReducer/userActionCreators";
import {NavigateFunction} from "react-router-dom";
import {AppDispatch} from "../../../store";

interface IErrors {
    [key: number]: (dispatch: AppDispatch, navigate: NavigateFunction) => void
}

const AuthFail = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(dropUserActionCreator());
    navigate("/login");
}

const errors: IErrors = {
    401: AuthFail,
}

export default errors
