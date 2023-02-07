import {NotificationItem} from '../../../components/shared/NotificationList/NotificationList';
import {IAction} from '../../../ts/interfaces/IAction';
import {NotificationListActionTypes} from './notificationListActionTypes';

export function addNotificationInNotificationList(notification: NotificationItem): IAction<NotificationListActionTypes, NotificationItem> {
  return {
    type: NotificationListActionTypes.ADD,
    payload: notification
  }
}

export function removeNotificationInNotificationList(notification: NotificationItem): IAction<NotificationListActionTypes, NotificationItem> {
  return {
    type: NotificationListActionTypes.REMOVE,
    payload: notification
  }
}
