export interface IAction<T, A = object> {
  type: T
  payload?: A
}
