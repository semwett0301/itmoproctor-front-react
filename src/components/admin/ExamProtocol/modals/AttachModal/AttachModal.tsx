import React, { FC } from 'react'
import { IAttach } from '../../../../../ts/interfaces/IVerify'
import cn from './AttachModal.module.scss'
import ModalTitle from '../../../../shared/ModalView/ModalTitle/ModalTitle'
import { IExam } from '../../../../../ts/interfaces/IExam'
import { Button } from '@consta/uikit/Button'
import { IconDownload } from '@consta/icons/IconDownload'
import axiosConfig from '../../../../../config/api/axiosСonfig';

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IAttachModalProp {
  attach: IAttach
  exam: IExam
}

const AttachModal: FC<IAttachModalProp> = ({ attach, exam }) => {
  const attachUrl = `${axiosConfig.baseUrl}storage/note/${exam.examId}/${attach.fileId}`

  return (
    <div className={cn.wrapper}>
      <ModalTitle titleString={attach.filename} />
      <div className={cn.content}>
        <div className={cn.documentWrapper}>
          <img className={cn.document} src={attachUrl} alt='photo' />
        </div>

        <div className={cn.footer}>
          <Button
            className={cn.downloadBtn}
            size={'s'}
            label={'Сохранить'}
            iconLeft={IconDownload}
            onClick={() => {
              const link = document.createElement('a')
              link.href = attachUrl
              link.download = ''
              link.target = '_blank'
              link.click()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AttachModal
