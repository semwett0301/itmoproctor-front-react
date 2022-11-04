import {IHocConfig} from '../interfaces/IHocConfig'
import {RoleEnum} from '../../config/authСonfig'

export type HocConfig = IHocConfig | IHocConfig<RoleEnum>
