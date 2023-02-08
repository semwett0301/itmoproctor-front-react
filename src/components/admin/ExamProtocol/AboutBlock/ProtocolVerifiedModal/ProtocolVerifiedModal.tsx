import React, {FC, useEffect, useState} from 'react'
import cn from './ProtocolVerifiedModal.module.scss'
import {useFlag} from '@consta/uikit/useFlag'
import {Loader} from '@consta/uikit/Loader'
import {IExam} from '../../../../../ts/interfaces/IExam'
import {request} from '../../../../../api/axios/request'
import {Text} from '@consta/uikit/Text'
import {IAttach, IVerify} from '../../../../../ts/interfaces/IVerify'
import ModalTitle from '../../../../shared/ModalView/ModalTitle/ModalTitle'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import {Button} from '@consta/uikit/Button'
import {IconRemove} from '@consta/uikit/IconRemove'
import {IconInfo} from '@consta/uikit/IconInfo'
import {getVerifyInfo} from './verifiedInfoConfig'
import axiosConfig from '../../../../../config/api/axiosСonfig';
import {classJoiner, classWatcher} from '../../../../../utils/common/styleClassesUtills';
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IProtocolVerifiedModalProp {
  exam: IExam
}

const ProtocolVerifiedModal: FC<IProtocolVerifiedModalProp> = ({ exam }) => {
  const [verify, setVerify] = useState<IVerify>()
  const [photoAttach, setPhotoAttach] = useState<IAttach>()
  const [docAttach, setDocAttach] = useState<IAttach>()

  const [isInfoOpen, setIsInfoOpen] = useFlag(true)

  const verifyUrl = axiosConfig.baseUrl + `storage/verify/${exam._id}/`

  useEffect(() => {
    request.exam.getVerify(exam.verified._id).then(({ data }) => {
      setVerify(data)
      if (data.attach.length == 2) {
        setPhotoAttach(data.attach.find((i) => i.filename === 'photo.png'))
        setDocAttach(data.attach.find((i) => i.filename === 'document.png'))
      }
    })
  }, [exam.verified])

  return (
    <div className={cn.modal}>
      <ModalTitle title={'verify'} />
      <div className={classJoiner(cnMixSpace({ m: 's' }), cn.content)}>
        {!verify ? (
          <Loader size='m' className={cn.loader} />
        ) : (
          <>
            <div className={classWatcher(isInfoOpen, cn.hiddenInfo, cn.activeInfo, cn.infoBlock)}>
              <div className={cn.photoWrapper}>
                <img className={cn.photo} src={verifyUrl + docAttach?.fileId} alt='document' />
              </div>
              <div className={cn.info}>
                {getVerifyInfo(verify).map((item) => (
                  <>
                    <Text size={'xs'} lineHeight={'xs'} className={cn.infoText}>
                      {item.title}
                    </Text>
                    <Text size={'xs'} lineHeight={'xs'} className={cn.infoText}>
                      {item.value}
                    </Text>
                  </>
                ))}
              </div>
            </div>

            <div className={cn.expandBtn}>
              <Button
                size={'xs'}
                form={'brick'}
                onlyIcon
                iconRight={isInfoOpen ? IconRemove : IconInfo}
                onClick={() => setIsInfoOpen.toogle()}
              />
            </div>

            <div className={cn.documentWrapper}>
              <img className={cn.document} src={verifyUrl + photoAttach?.fileId} alt='photo' />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProtocolVerifiedModal
