import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {ruLocalization} from "./localizations/ruLocalization";
import {engLocalization} from "./localizations/engLocalization";


const resources = {
    ru: ruLocalization,
    en: engLocalization
}

i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: resources
    });







