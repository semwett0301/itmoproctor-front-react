import React, { FC, useEffect } from 'react'
import cl from './exams.module.scss'
import { Layout } from '@consta/uikit/Layout'
import { Pagination } from '@consta/uikit/Pagination'
import ExamTable from './components/ExamTable/ExamTable'
import FilterField from './components/FilterField/FilterField'
import { useOutletContext } from 'react-router-dom'
import { useRequest } from '../../../hooks/requestHooks'
import { setUserActionCreator } from '../../../store/reducers/userReducer/userActionCreators'
import { userLoadedActionCreator } from '../../../store/reducers/userLoaded/userLoadedActionCreators'

interface ExamsProps {
  openTab: () => void
}

const Exams: FC = () => {
  const context = useOutletContext<ExamsProps>()
  const request = useRequest()

  useEffect(() => {
    const getExams = async () => {
      await request.exams.getListOfExams().then((r) => console.log(r))
    }

    getExams().catch((e) => console.log(e))

    console.log('Z')
  }, [])

  return (
    <>
      <FilterField />
      <Layout className={cl.fillLayout}>
        <div className={cl.card}>
          <ExamTable onVideoBtnClick={context.openTab} />
        </div>
      </Layout>

      <Pagination
        currentPage={1}
        totalPages={2}
        onChange={(item) => console.log(item)}
        className={cl.minLayout}
      />
    </>
  )
}

export default Exams
