import React, { FC, useState } from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cn from './AddEditExam.module.scss'
import { SkeletonText } from '@consta/uikit/Skeleton'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import SaveButton from '../../../shared/ModalView/SaveButton/SaveButton'

// TYPES
// interface IExamForm {
//   _id: string
//   verifications: DefaultItem
//   examId: string
//   assignment: string
//   examCode: string
//   student: IStudent
//   subject: string
//   duration: number
//   leftDate: Date
//   rightDate: Date
//   async: boolean
//   platformURL: string
//   organization: IOrganization
//   course: ICourse
//   __v: number
//   beginDate: Date
//   comment?: any
//   endDate: Date
//   expert: IExpert
//   info?: any
//   inspector?: any
//   resolution?: any
//   startDate: Date
//   stopDate: Date
//   verified: string
//   videoAvailable?: any
// }

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface IAddEditExamProp {
  examId?: string
  onClick: () => void
}

const AddEditExam: FC<IAddEditExamProp> = () => {
  const [isLoading] = useState<boolean>(false)

  // const { control, formState, reset, handleSubmit } = useForm<IExamForm>({
  //   mode: 'all'
  // })

  return (
    <>
      <ModalTitle title={'exam'} />
      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cn.wrapper)}>
        {isLoading ? (
          <SkeletonText fontSize='l' rows={40} />
        ) : (
          <form>
            <FilterConstructor items={[]} />
            <SaveButton valid={true} />
          </form>
        )}
      </div>
    </>
  )
}

export default AddEditExam
