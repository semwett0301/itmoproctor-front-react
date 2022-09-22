import React from 'react';
import {Theme, presetGpnDefault, presetGpnDark} from '@consta/uikit/Theme';
import Router from "./router/MainRouter";
import MainRouter from "./router/MainRouter";

function App() {

    return (
        <Theme preset={presetGpnDefault}>
            <MainRouter/>
        </Theme>
    );
}

export default App;
