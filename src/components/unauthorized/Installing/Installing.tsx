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
      <Logo logoWidth={97} logoHeight={89}/>
      <Text size={'m'}>Система прокторинга от ИТМО</Text>
      <Button label={'Скачать'} size={'l'} view={'primary'}/>
      <Text>версия {metadata.version} (от {metadata.date.getDate()}.{metadata.date.getMonth()}.{metadata.date.getFullYear()})</Text>
      <Text>для {osMatcher[osInfo.detectedOS]} x{osInfo.detectedArch}</Text>
      <Text>Другие версии приложения</Text>
      {
        md5OtherKeys.map(e => {
          return (
            <div key={e} className={classes.other_version}>
              <IconDiamond size={'s'}/>
              <a href={e}>
                <Text>{e}</Text>
              </a>
            </div>
          )
        })
      }
    </div>
  );
};

export default Installing;
