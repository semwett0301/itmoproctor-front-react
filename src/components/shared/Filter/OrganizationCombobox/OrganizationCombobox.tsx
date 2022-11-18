import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Combobox } from '@consta/uikit/Combobox'
import { IOrganization } from '../../../../ts/interfaces/IOrganizations'
import { useOrganizations } from '../../../../hooks/organizationsHooks'
import set = Reflect.set
import { Simulate } from 'react-dom/test-utils'
import load = Simulate.load

interface IOrganizationSelectProp {
  value: IOrganization[]
  organizationsIds: string[]
  onChange: (props: { value: IOrganization[] | null; e: React.SyntheticEvent }) => void
  isIdsLoading: boolean
}

const OrganizationCombobox: FC<IOrganizationSelectProp> = ({
  value,
  onChange,
  organizationsIds,
  isIdsLoading
}) => {
  const [items, setItems] = useState<IOrganization[]>([])

  const { loading, getOrganizations } = useOrganizations()

  useEffect(() => {
    const setAll: () => Promise<IOrganization[]> = async () => {
      return await getOrganizations(organizationsIds)
    }

    setAll().then((r) => setItems(r))
  }, [isIdsLoading, loading])

  return (
    <Combobox
      isLoading={loading || isIdsLoading}
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

export default OrganizationCombobox
