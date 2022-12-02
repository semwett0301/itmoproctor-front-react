import React, { FC, useEffect, useState } from 'react'
import { Combobox } from '@consta/uikit/Combobox'
import { IOrganization } from '../../../../ts/interfaces/IOrganizations'
import { useOrganizations } from '../../../../hooks/organizationsHooks'

interface IOrganizationSelectProp {
  value: IOrganization[] | null
  organizationsIds?: string[]
  onChange: (props: { value: IOrganization[] | null; e: React.SyntheticEvent }) => void
  isIdsLoading: boolean
  placeholder?: string
  label?: string
}

const OrganizationCombobox: FC<IOrganizationSelectProp> = ({
  value,
  onChange,
  organizationsIds,
  isIdsLoading,
  placeholder,
  label
}) => {
  const [items, setItems] = useState<IOrganization[]>([])

  const { loading, getOrganizations } = useOrganizations()

  useEffect(() => {
    const setAll: () => Promise<IOrganization[]> = async () =>
      organizationsIds ? await getOrganizations(organizationsIds) : await getOrganizations()

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
      placeholder={placeholder ?? 'Правообладатель'}
      label={label}
      size='s'
      searchFunction={(item, searchValue) =>
        (item.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.shortName?.toLowerCase().includes(searchValue.toLowerCase())) ??
        false
      }
    />
  )
}

export default OrganizationCombobox
