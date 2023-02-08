import React, {FC, useState} from 'react';
import {Item} from '../../../ts/types/Item';
import {findLang, languages} from '../../../utils/i18n/findItem';
import {Button} from '@consta/uikit/Button';
import i18n from 'i18next';
import classes from './SwitchLanguage.module.scss'

const SwitchLanguage: FC = () => {

  const [lang, setLang] = useState<Item>(findLang(i18n.language))

  const selectChangeHandler = (): void => {

    const value = languages.filter(e => e !== lang)[0]

    if (value !== null) {
      i18n.changeLanguage(value.id).then()
    }
    setLang(value)
  }



  return (
    <div className={classes.wrap}>
      <Button
        size='s'
        view='clear'
        label={lang.id === 'ru' ? 'Switch to English' : 'Переключить на русский'}
        onClick={selectChangeHandler}
      />
    </div>
  );
};

export default SwitchLanguage;
