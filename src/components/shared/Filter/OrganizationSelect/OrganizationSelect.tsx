import React, {FC, useEffect, useState} from 'react'
import {Combobox} from '@consta/uikit/Combobox'
import {IOrganization} from '../../../../ts/interfaces/IOrganizations'
import {useOrganizations} from '../../../../hooks/organizationsHooks'

interface IOrganizationSelectProp {
  organizationsIds: string[]
  value: IOrganization[] | null
  onChange: (props: { value: IOrganization[] | null; e: React.SyntheticEvent }) => void
}

const OrganizationSelect: FC<IOrganizationSelectProp> = ({ value, onChange, organizationsIds }) => {
  const [items, setItems] = useState<IOrganization[]>([])

  const {loading, getOrganizations} = useOrganizations()

  useEffect(() => {
    setItems(getOrganizations(organizationsIds))
  }, [organizationsIds])

  return (
    <Combobox
      isLoading={loading}
      items={items}
      value={value}
      multiple={true}
      onChange={onChange}
      getItemKey={(item) => item._id}
      getItemLabel={(item) =>
        item.shortName || item.fullName || `Отсутствует название \n ID:${item._id}`
      }
      placeholder='Правообладатель'
      size='s'
    />
  )
}

export default OrganizationSelect
