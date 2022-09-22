import {AxiosInstance} from "axios";
import {IOrganization} from "../../../../ts/interfaces/IOrganization";

export default function (instance: AxiosInstance){
    return {
        getListOfOrganizations() {
            return instance.get('admin/organizations')
        },

        getOrganization(orgId: string){
            return instance.get(`organization/${orgId}`)
        },

        addOrganization(newOrg: IOrganization) {
            return instance.post('organization', newOrg)
        },

        removeOrganization(orgId: string) {
            return instance.delete(`organization/${orgId}`)
        },

        updateOrganization(orgId: string, data: IOrganization) {
            return instance.put(`organization/${orgId}`, data)
        }
    }
}
