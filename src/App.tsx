import React, {useEffect, useMemo} from 'react';
import {Theme, presetGpnDefault} from '@consta/uikit/Theme';
import MainRouter from "./router/MainRouter";
import {useRequest} from "./hooks/requestHooks";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {setUserActionCreator} from "./store/reducers/userReducer/userActionCreators";
import {userLoadedActionCreator} from "./store/reducers/userLoaded/userLoadedActionCreators";

function App() {
    const request = useRequest();
    const dispatch = useAppDispatch();
    const userLoaded = useAppSelector(state => state.userLoaded)

    useEffect(() => {
        if (!userLoaded) {
            request.profile.getProfileBySession()
                .then(r => {
                    dispatch(setUserActionCreator(r.data))
                })
            dispatch(userLoadedActionCreator())
        }
    }, [dispatch, request.profile, userLoaded])

    return (
        <Theme preset={presetGpnDefault}>
            <MainRouter/>
        </Theme>
    );
}

export default App;
