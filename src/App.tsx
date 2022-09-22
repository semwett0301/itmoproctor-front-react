import React from 'react';
import AuthPage from "./components/shared/AuthPage/AuthPage";
import {Theme, presetGpnDefault} from '@consta/uikit/Theme';

function App() {

    return (
        <Theme preset={presetGpnDefault}>
            <AuthPage/>
        </Theme>

    );
}

export default App;
