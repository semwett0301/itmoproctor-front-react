import React from 'react';
import {useTranslation} from "react-i18next";

function App() {

    const {t, i18n} = useTranslation()

    return (
        <div>
            {t('student.name')}
        </div>
    );
}

export default App;
