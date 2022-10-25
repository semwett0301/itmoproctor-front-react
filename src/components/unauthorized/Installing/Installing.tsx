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

const Installing: FC = () => {
  const metadata = useLoaderData() as IDistMetadata
  const osInfo = useAppSelector(state => state.osInfo)

  metadata.date = new Date(metadata.date)
  const md5TargetKey: string = Object.keys(metadata.md5).filter(k => k.includes(osInfo.detectedOS) && k.includes(osInfo.detectedArch))[0]
  const md5OtherKeys: string[] = Object.keys(metadata.md5).filter(k => k !== md5TargetKey)

  return (
    <div className={classes.main_container}>
      <div className={classes.logo}>
        <Logo logoWidth={90} logoHeight={82.5}/>
      </div>
      <div className={classes.text_proctoring}>
        <Text size={'m'}>Система прокторинга от ИТМО</Text>
      </div>
      <a href={`${axiosConfig.baseUrl}/dist/${md5TargetKey}`}>
        <Button label={'Скачать'} size={'l'} view={'primary'}/>
      </a>
      <Text className={classes.version}>версия {metadata.version} (от {metadata.date.getDate()}.{metadata.date.getMonth()}.{metadata.date.getFullYear()})</Text>
      <Text className={classes.os}>для {osMatcher[osInfo.detectedOS]} x{osInfo.detectedArch}</Text>
      <div className={classes.other_versions}>
        <Text className={classes.other_versions_text}>Другие версии приложения</Text>
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
