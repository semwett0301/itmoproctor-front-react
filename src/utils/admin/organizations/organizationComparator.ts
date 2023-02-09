import {IOrganization} from '../../../ts/interfaces/IOrganizations';

const localStringCompare = (str1?: string, str2?: string) => {
  if (str1) {
    if (str2) {
      if (str1 > str2) {
        return 1
      } else {
        if (str2 < str1) {
          return -1
        } else {
          return 0
        }
      }
    } else {
      return 1
    }
  } else {
    return -1
  }
}

export const organizationComparator: (org1: IOrganization, org2: IOrganization) => number = (org1, org2) => {
  if (localStringCompare(org1.fullName, org2.fullName)) return localStringCompare(org1.fullName, org2.fullName)
  else return localStringCompare(org1.shortName, org2.shortName)
}
