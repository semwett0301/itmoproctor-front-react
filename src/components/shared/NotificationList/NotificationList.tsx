import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {SnackBar, SnackBarItemStatus} from '@consta/uikit/SnackBar';
import store from '../../../store';
import {
  addNotificationInNotificationList, removeNotificationInNotificationList
} from '../../../store/reducers/notificationList/notificationListActionCreators';

import cl from './NotificationList.module.scss'

export type NotificationItem = {
  key: number;
  message: string;
  status: SnackBarItemStatus,
  autoClose: number,
  progressMode: 'timer';
  showProgress: boolean
}

export function addNotification(message: string, status: SnackBarItemStatus, autoClose = 3): void {
  const currentList: NotificationItem[] = store.getState().notificationList

  const lastKey: number = currentList[currentList.length - 1]?.key ?? 0

  store.dispatch(addNotificationInNotificationList({
    key: lastKey + 1,
    message: message,
    status: status,
    autoClose: autoClose,
    progressMode: 'timer',
    showProgress: true
  }))
}

const NotificationList: FC = () => {
  const notificationList = useAppSelector<NotificationItem[]>(state => state.notificationList)

  const dispatch = useAppDispatch()

  return (
      <SnackBar
        className={cl.snackBar}
        items={notificationList}
        onItemClose={item => dispatch(removeNotificationInNotificationList(item))}/>
  );
};

export default NotificationList;
