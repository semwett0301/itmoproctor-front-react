import React, { FC, useCallback, useState } from 'react'
import { Text } from '@consta/uikit/Text'
import { Radio } from '@consta/uikit/Radio'
import { findLang, languages } from '../../../../../utils/findItem'
import cl from './SystemSettings.module.scss'
import i18n from 'i18next'

const SystemSettings: FC = () => {
  const [lang, setLang] = useState<string>(findLang(i18n.language).id)
  const changeLanguage = async (currentLanguage: string) => {
    const newLang =
      lang == currentLanguage ? currentLanguage : languages.filter((e) => e.id !== lang)[0].id
    setLang(() => newLang)
    await i18n.changeLanguage(newLang).then()
  }

  return (
    <div className={cl.wrapper}>
      <Text className={cl.header} view={'primary'} size={'s'} weight={'semibold'}>
        ITMOproctor
      </Text>
      <div className={cl.info_wrapper}>
        <div>
          <Text view={'secondary'} size={'m'}>
            Версия приложения
          </Text>
          <Text view={'secondary'} size={'m'}>
            Ваша система
          </Text>
          <Text view={'secondary'} size={'m'}>
            Язык
          </Text>
          <Text view={'secondary'} size={'m'}>
            Последняя версия
          </Text>
          <Text view={'secondary'} size={'m'}>
            Скачать
          </Text>
        </div>
        <div>
          <Text view={'primary'} size={'m'}>
            1.0.0
          </Text>
          <Text view={'primary'} size={'m'}>
            Windows (64)
          </Text>
          <div className={cl.chooseLanguage}>
            <Radio
              size={'m'}
              checked={lang == 'ru'}
              onClick={() => changeLanguage('ru')}
              label={'Русский'}
            />
            <Radio
              size={'m'}
              checked={lang == 'en'}
              onClick={() => changeLanguage('en')}
              label={'English'}
            />
          </div>
          <Text view={'primary'} size={'m'}>
            1.0.1 (15.03.2022)
          </Text>
          <Text view={'primary'} size={'m'}>
            itmoproctor-win-x64.zip
          </Text>
        </div>
      </div>
    </div>
  )
}

export default SystemSettings
