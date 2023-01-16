import React, {FC, useEffect, useLayoutEffect, useState} from 'react'
import {Text} from '@consta/uikit/Text'
import {Radio} from '@consta/uikit/Radio'
import {findLang, languages} from '../../../../../utils/findItem'
import cl from './SystemSettings.module.scss'
import i18n from 'i18next'
import {useAppSelector} from '../../../../../hooks/reduxHooks';
import {IOsInfo} from '../../../../../store/reducers/osInfo/osInfoReducer';
import {osMatcher} from '../../../../../utils/osMatcher';
import {IDistMetadata} from '../../../../../api/axios/modules/dist';
import {request} from '../../../../../api/axios/request';
import dayjs from 'dayjs'
import AsyncWaiting from '../../../../shared/AsyncWaiting/AsyncWaiting';

const SystemSettings: FC = () => {
  const [lang, setLang] = useState<string>(findLang(i18n.language).id)
  const [versions, setVersions] = useState<IDistMetadata>()

  const changeLanguage = async (currentLanguage: string) => {
    const newLang =
      lang == currentLanguage ? currentLanguage : languages.filter((e) => e.id !== lang)[0].id
    setLang(() => newLang)
    await i18n.changeLanguage(newLang).then()
  }

  const system = useAppSelector<IOsInfo>(state => state.osInfo)

  useLayoutEffect(() => {
    const fetchInfo: () => Promise<void> = async () => {
      await request.dist.getInfo().then(r => {
        setVersions(r.data)
      })
    }

    fetchInfo().catch(e => console.log(e))
  }, [])

  return (
    <div className={cl.wrapper}>
      <Text className={cl.header} view={'primary'} size={'s'} weight={'semibold'}>
        ITMOproctor
      </Text>
      <AsyncWaiting size={'m'} value={versions} mode={'loader'}>
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
              {osMatcher[system.detectedOS]} (x{system.detectedArch})
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
              {versions?.versions[0].version || ''} ({dayjs(versions?.versions[0].date).format('DD.MM.YYYY').toString() || ''})
            </Text>
            <Text view={'primary'} size={'m'}>
              itmoproctor-win-x64.zip
            </Text>
          </div>
        </div>
      </AsyncWaiting>
    </div>
  )
}

export default SystemSettings
