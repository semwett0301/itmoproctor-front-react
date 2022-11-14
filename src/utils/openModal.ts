import store from '../store';
import {
  setComponentActionCreator,
  setVisibleActionCreator
} from '../store/reducers/selectedModal/selectedModalActionCreators';

export function openModal(component: JSX.Element): void {
  store.dispatch(setComponentActionCreator(component))
  store.dispatch(setVisibleActionCreator())
}
