import {IHocParameter} from '../interfaces/IHocConfig'
import {RoleEnum} from '../../config/router/authСonfig'

export type HocParameter = IHocParameter<undefined> | IHocParameter<RoleEnum>
