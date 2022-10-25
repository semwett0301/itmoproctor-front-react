import React, {FC} from 'react';
import Logo from '../../shared/Logo/Logo';
import classes from './Installing.module.scss'
import {Text} from '@consta/uikit/Text';
import {Button} from '@consta/uikit/Button';
import {useLoaderData} from 'react-router-dom';
import {IDistMetadata} from '../../../api/axios/modules/dist';
import {useAppSelector} from '../../../hooks/reduxHooks';
import {osMatcher} from '../../../utils/osMatcher';
import axiosConfig from '../../../config/axiosСonfig';
import {IconDiamond} from '@consta/uikit/IconDiamond';
import {useTranslation} from 'react-i18next';
import SwitchLanguage from '../../shared/SwitchLanguage/SwitchLanguage';

const Installing: FC = () => {
  const metadata = useLoaderData() as IDistMetadata
  const osInfo = useAppSelector(state => state.osInfo)

  metadata.date = new Date(metadata.date)
  const md5TargetKey: string = Object.keys(metadata.md5).filter(k => k.includes(osInfo.detectedOS) && k.includes(osInfo.detectedArch))[0]
  const md5OtherKeys: string[] = Object.keys(metadata.md5).filter(k => k !== md5TargetKey)

  const {t} = useTranslation()

  return (
    <div className={classes.main_container}>
      <SwitchLanguage/>
      <div className={classes.logo}>
        <Logo logoWidth={90} logoHeight={82.5}/>
      </div>
      <div className={classes.text_proctoring}>
        <Text weight={'light'} size={'m'}>{t('unauthorized.installing.name')}</Text>
      </div>
      <a href={`${axiosConfig.baseUrl}/dist/${md5TargetKey}`}>
        <Button label={t('unauthorized.installing.download')} size={'l'} view={'primary'}/>
      </a>
      <Text weight={'light'}
            className={classes.version}>{t('unauthorized.installing.version')} {metadata.version} ({t('unauthorized.installing.from')} {metadata.date.getDate()}.{metadata.date.getMonth()}.{metadata.date.getFullYear()})</Text>
      <Text weight={'light'} className={classes.os}>{t('unauthorized.installing.forEach')} {osMatcher[osInfo.detectedOS]} x{osInfo.detectedArch}</Text>
      <div className={classes.other_versions}>
        <Text weight={'light'} className={classes.other_versions_text}>{t('unauthorized.installing.other')}</Text>
        <div className={classes.other_version_body}>
          {
            md5OtherKeys.map(e => {
              return (
                <div key={e} className={classes.other_version}>
                  <IconDiamond className={classes.icon_diamond} size={'s'}/>
                  <a href={`${axiosConfig.baseUrl}/dist/${e}`}>
                    <Text>{e}</Text>
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Installing;
