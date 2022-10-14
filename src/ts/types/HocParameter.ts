import { IHocParameter } from '../interfaces/IHocConfig'
import { RoleEnum } from '../../config/authСonfig'

export type HocParameter = IHocParameter<undefined> | IHocParameter<RoleEnum>
