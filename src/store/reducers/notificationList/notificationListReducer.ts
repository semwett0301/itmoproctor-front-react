import {NotificationItem} from '../../../components/shared/NotificationList/NotificationList';
import {IAction} from '../../../ts/interfaces/IAction';
import {NotificationListActionTypes} from './notificationListActionTypes';

export const notificationListReducer = (
  state: NotificationItem[] = [],
  action: IAction<NotificationListActionTypes, NotificationItem>
) => {
  switch (action.type) {
    case NotificationListActionTypes.ADD:
      return [
        ...state,
        action.payload
      ]
    case NotificationListActionTypes.REMOVE:
      return state.filter(notification => notification.key != action.payload?.key)
    default:
      return state
  }
}
