import React, { FC } from 'react'
import cn from './UserRow.module.scss'
import { IStudent } from '../../../../../ts/interfaces/IStudent'
import { IInspector } from '../../../../../ts/interfaces/IInspector'
import { IExpert } from '../../../../../ts/interfaces/IExpert'
import { IconUser } from '@consta/uikit/IconUser'
import { getFullName } from '../../../../../utils/nameHelper'
import { Text } from '@consta/uikit/Text'
import { openModal } from '../../../../shared/ModalView/ModalView'
import ListenerView from '../../../modals/ListenerView/ListenerView'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IUserRowProp {
  user?: IStudent | IInspector | IExpert | null | undefined
  withModal?: boolean
}

const UserRow: FC<IUserRowProp> = ({ user, withModal }) => {
  return (
    <div className={cn.row}>
      <IconUser size={'xs'} />
      {user ? (
        <Text
          size={'xs'}
          view={withModal ? 'link' : 'primary'}
          cursor={withModal ? 'pointer' : undefined}
          onClick={withModal ? () => openModal(<ListenerView profileId={user._id} />) : undefined}
        >
          {getFullName(user.lastname, user.firstname, user.middlename)}
        </Text>
      ) : (
        <Text view={'secondary'} size={'xs'}>
          не назначен
        </Text>
      )}
    </div>
  )
}

export default UserRow
