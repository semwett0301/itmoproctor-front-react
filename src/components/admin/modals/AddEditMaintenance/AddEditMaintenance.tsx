import React, {FC, useEffect, useState} from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import {SkeletonText} from '@consta/uikit/Skeleton'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import {IMaintenancePost} from '../../../../ts/interfaces/IMaintenance'
import {DefaultItem, Select} from '@consta/uikit/Select'
import dayjs, {Dayjs} from 'dayjs'
import {DatePicker} from '@consta/uikit/DatePicker'
import cl from './AddEditMaintenance.module.scss'
import {Button} from '@consta/uikit/Button'
import {IconCheck} from '@consta/uikit/IconCheck'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import {classJoiner} from '../../../../utils/common/styleClassesUtills'
import {IconCalendar} from '@consta/uikit/IconCalendar'
import {request} from '../../../../api/axios/request'
import {closeModal} from '../../../shared/ModalView/ModalView'
import {Modify} from '../../../../utils/ts/typesUtils'
// TYPES
type booleanItem = DefaultItem & { value: boolean }

type IMaintenance = Modify<
  IMaintenancePost,
  { beginDate: Dayjs; endDate: Dayjs; active: booleanItem }
>

interface IAddEditMaintenanceProp {
  maintenanceId?: string
  onSubmit?: () => void
}

// CONSTANTS
const activeItems: booleanItem[] = [
  { label: 'Да', id: 1, value: true },
  { label: 'Нет', id: 2, value: false }
]

// DEFAULT FUNCTIONS

const toMaintenancePost = ({ beginDate, endDate, active }: IMaintenance): IMaintenancePost => ({
  beginDate: beginDate.toISOString(),
  endDate: endDate.toISOString(),
  active: active.value
})

// COMPONENT
const AddEditMaintenance: FC<IAddEditMaintenanceProp> = ({ maintenanceId, onSubmit }) => {
  const [maintenance, setMaintenance] = useState<IMaintenance>({
    beginDate: dayjs().startOf('hour'),
    endDate: dayjs().add(1, 'hour').startOf('h'),
    active: activeItems[0]
  })

  const [isLoad, setIsLoad] = useState<boolean>(false)

  useEffect(() => {
    if (maintenanceId) {
      setIsLoad(true)
      request.maintenance.getMaintenance(maintenanceId).then((r) => {
        setMaintenance({
          beginDate: dayjs(r.data.beginDate),
          endDate: dayjs(r.data.endDate),
          active: r.data.active ? activeItems[0] : activeItems[1]
        })
        setIsLoad(false)
      })
    }
  }, [maintenanceId])

  return (
    <div>
      <ModalTitle title={'maintenance'} />

      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cl.content)}>
        {isLoad ? (
          <SkeletonText rows={2} fontSize='xl' lineHeight={'l'} className={cl.skeleton} />
        ) : (
          <FilterConstructor
            items={[
              {
                key: 1,
                components: [
                  {
                    key: 11,
                    component: (
                      <DatePicker
                        size={'s'}
                        type='date-time-range'
                        width={'full'}
                        format='MM.dd.yyyy HH:mm'
                        placeholder='ММ.ДД.ГГГГ ЧЧ:ММ'
                        multiplicitySeconds={0}
                        rightSide={[IconCalendar, IconCalendar]}
                        label={'Плановые даты'}
                        value={[maintenance.beginDate.toDate(), maintenance.endDate.toDate()]}
                        onChange={({ value }) =>
                          setMaintenance((prevState) => ({
                            ...prevState,
                            beginDate: value && value[0] ? dayjs(value[0]) : dayjs().startOf('h'),
                            endDate:
                              value && value[1]
                                ? dayjs(value[1])
                                : dayjs().add(1, 'hour').startOf('h')
                          }))
                        }
                      />
                    ),
                    flex: 1
                  }
                ]
              },
              {
                key: 2,
                components: [
                  {
                    key: 21,
                    component: (
                      <Select
                        size={'s'}
                        items={activeItems}
                        value={maintenance.active}
                        label={'Активный'}
                        onChange={({ value }) =>
                          setMaintenance((prevState) => ({
                            ...prevState,
                            active: value ?? activeItems[0]
                          }))
                        }
                      />
                    ),
                    flex: 2
                  }
                ]
              }
            ]}
          />
        )}
      </div>
      <div className={cl.footer}>
        <Button
          size={'s'}
          label={'Сохранить'}
          iconLeft={IconCheck}
          onClick={() => {
            Promise.resolve(
              maintenanceId
                ? request.maintenance.editMaintenance(toMaintenancePost(maintenance), maintenanceId)
                : request.maintenance.addMaintenance(toMaintenancePost(maintenance))
            )

              .then(() => {
                if (onSubmit) {
                  onSubmit()
                }
              })
              .then(() => closeModal())
              .catch((e) => console.log(e))
          }}
        />
      </div>
    </div>
  )
}

export default AddEditMaintenance
