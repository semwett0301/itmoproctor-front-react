import React from 'react';
import {Theme, presetGpnDefault} from '@consta/uikit/Theme';
import MainRouter from "./router/MainRouter";

function App() {

    return (
        <Theme preset={presetGpnDefault}>
            <MainRouter/>
        </Theme>
    );
}

export default App;
