import React, {FC} from 'react'
import cl from '../DeleteSubmit/DeleteSubmit.module.scss'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import {Text} from '@consta/uikit/Text'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import {classJoiner} from '../../../../utils/common/styleClassesUtills'
import {Button} from '@consta/uikit/Button'
import {IconDownload} from '@consta/uikit/IconDownload'

// TYPES
interface IDownloadSubmitProp {
  onSubmit: () => void
}

const DownloadSubmit: FC<IDownloadSubmitProp> = ({ onSubmit }) => {
  return (
    <div className={cl.wrapper}>
      <ModalTitle title={'downloadSubmit'} />
      <Text size={'s'} className={cnMixSpace({ p: 's' })}>
        Загрузить видео экзамена?
      </Text>

      <div className={classJoiner(cnMixSpace({ pH: '2xl', pT: '3xs', pB: 'm' }), cl.buttonBlock)}>
        <Button
          label={'Загрузить'}
          onClick={() => onSubmit()}
          size={'s'}
          iconRight={IconDownload}
        />
      </div>
    </div>
  )
}

export default DownloadSubmit
