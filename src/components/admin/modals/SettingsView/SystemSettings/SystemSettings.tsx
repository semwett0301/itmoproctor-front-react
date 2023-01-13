import React, {FC, useCallback, useState} from 'react';
import {Text} from '@consta/uikit/Text';
import {Radio} from '@consta/uikit/Radio';
import {findLang, languages} from '../../../../../utils/findItem';
import i18n from 'i18next';

const SystemSettings: FC = () => {
  const [lang, setLang] = useState<string>(findLang(i18n.language).id)
  const changeLanguage = useCallback<() => void>(async () => {
    const newLang = lang == 'ru' ? 'en' : 'ru'
    setLang(() => newLang)
    await i18n.changeLanguage(newLang).then()
  }, [setLang, languages, findLang])

  return (
    <div>
      <Text view={'primary'} size={'s'} weight={'semibold'}>ITMOproctor</Text>
      <div>
        <Text view={'secondary'} size={'s'}>Версия приложения</Text>
        <Text view={'secondary'} size={'s'}>Ваша система</Text>
        <Text view={'secondary'} size={'s'}>Язык</Text>
        <Text view={'secondary'} size={'s'}>Последняя версия</Text>
        <Text view={'secondary'} size={'s'}>Скачать</Text>
      </div>
      <div>
        <Text view={'primary'} size={'s'}>1.0.0</Text>
        <Text view={'primary'} size={'s'}>Windows (64)</Text>
        <div>
          <Radio size={'m'} checked={lang == 'ru'} onClick={changeLanguage} label={'Русский'}/>
          <Radio size={'m'} checked={lang == 'en'} onClick={changeLanguage} label={'English'}/>
        </div>
        <Text view={'primary'} size={'s'}>1.0.1 (15.03.2022)</Text>
        <Text view={'primary'} size={'s'}>itmoproctor-win-x64.zip</Text>
      </div>
    </div>
  );
};

export default SystemSettings;
