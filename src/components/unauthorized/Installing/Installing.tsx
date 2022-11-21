import React, { FC, useState } from 'react'
import Logo from '../../shared/Logo/Logo'
import classes from './Installing.module.scss'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { useLoaderData } from 'react-router-dom'
import { IDistMetadata } from '../../../api/axios/modules/dist'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { osMatcher } from '../../../utils/osMatcher'
import axiosConfig from '../../../config/axiosСonfig'
import { IconDiamond } from '@consta/uikit/IconDiamond'
import { useTranslation } from 'react-i18next'
import SwitchLanguage from '../../shared/SwitchLanguage/SwitchLanguage'
import { IArchive } from '../../../ts/interfaces/IVersion'
import dayjs from 'dayjs'

const Installing: FC = () => {
  const metadata = useLoaderData() as IDistMetadata
  const osInfo = useAppSelector((state) => state.osInfo)
  const [currentVersion, setCurrentVersion] = useState<number>(0)

  const md5TargetKey: IArchive = metadata.versions[currentVersion].archives.filter(
    (k) => k.os.includes(osInfo.detectedOS) && k.arch.toString() === osInfo.detectedArch
  )[0]
  const md5OtherKeys: IArchive[] = metadata.versions[currentVersion].archives.filter(
    (k) => k !== md5TargetKey
  )

  const { t } = useTranslation()

  return (
    <div className={classes.main_container}>
      <SwitchLanguage />
      <Logo />
      <div className={classes.text_proctoring}>
        <Text size={'m'} view={'secondary'} weight={'light'}>
          {t('unauthorized.installing.name')}
        </Text>
      </div>
      <a href={`${axiosConfig.baseUrl}${md5TargetKey.path}`}>
        <Button label={t('unauthorized.installing.download')} size={'l'} view={'primary'} />
      </a>
      <Text size={'s'} view={'secondary'} weight={'light'} className={classes.version}>
        {t('unauthorized.installing.version')} {metadata.versions[currentVersion].version}{' '}
        {t('unauthorized.installing.from')}{' '}
        {dayjs(metadata.versions[currentVersion].date).format('DD.MM.YYYY')}
      </Text>
      <Text size={'s'} view={'secondary'} weight={'light'} className={classes.os}>
        {t('unauthorized.installing.forEach')} {osMatcher[osInfo.detectedOS]} x{osInfo.detectedArch}
      </Text>
      <div className={classes.other_versions}>
        <Text size={'s'} view={'secondary'} weight={'light'}>
          {t('unauthorized.installing.other')}
        </Text>
        <div className={classes.other_version_body}>
          {md5OtherKeys.map((e) => {
            return (
              <div key={e.os} className={classes.other_version}>
                <IconDiamond className={classes.icon_diamond} size={'s'} />
                <a title={e.md5} href={`${axiosConfig.baseUrl}${e.path}`}>
                  <Text cursor={'pointer'} size={'s'} view={'linkMinor'}>
                    {t('unauthorized.installing.forEach')} {e.os} x{e.arch}
                  </Text>
                </a>
              </div>
            )
          })}
          {currentVersion < metadata.versions.length - 1 ? (
            <div className={classes.other_version}>
              <IconDiamond className={classes.icon_diamond} size={'s'} />
              <Text
                cursor={'pointer'}
                onClick={() => {
                  setCurrentVersion(currentVersion + 1)
                }}
                size={'s'}
                view={'linkMinor'}
              >
                {t('unauthorized.installing.prevVersion')}
              </Text>
            </div>
          ) : (
            <></>
          )}
          {currentVersion > 0 ? (
            <div className={classes.other_version}>
              <IconDiamond className={classes.icon_diamond} size={'s'} />
              <Text
                cursor={'pointer'}
                onClick={() => {
                  setCurrentVersion(currentVersion - 1)
                }}
                size={'s'}
                view={'linkMinor'}
              >
                {t('unauthorized.installing.nextVersion')}
              </Text>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Installing
