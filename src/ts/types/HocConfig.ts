import {IHocConfig} from '../interfaces/IHocConfig'
import {RoleEnum} from '../../config/router/authСonfig'

export type HocConfig = IHocConfig | IHocConfig<RoleEnum>
