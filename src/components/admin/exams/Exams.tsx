import React, {FC} from 'react';
import cl from './exams.module.scss'
import {Layout} from "@consta/uikit/Layout";
import {Pagination} from "@consta/uikit/Pagination";
import ExamTable from "./components/ExamTable/ExamTable";
import FilterField from "./components/FilterField/FilterField";


export interface TabItem {
    id: number,
    title: string
}


const Exams: FC = () => {

    return (
        <>
            <FilterField/>
            <Layout className={cl.fillLayout}>
                <div className={cl.card}>
                    <ExamTable
                        onVideoBtnClick={(item: TabItem) => {
                            console.log(item)
                        }}
                    />
                </div>
            </Layout>

            <Pagination
                currentPage={1}
                totalPages={2}
                onChange={(item) => console.log(item)}
                className={cl.minLayout}
            />
        </>

    );
};

export default Exams;

