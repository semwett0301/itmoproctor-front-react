import React, {FC} from 'react';
import cl from './exams.module.scss'
import {Layout} from "@consta/uikit/Layout";
import {Pagination} from "@consta/uikit/Pagination";
import ExamTable from "./components/ExamTable/ExamTable";
import FilterField from "./components/FilterField/FilterField";
import {useOutletContext} from "react-router-dom";


export interface TabItem {
    id: number,
    title: string
}

interface ExamsProps{
    openTab: (item:TabItem) => void
}

const Exams:FC = () => {

    const context = useOutletContext<ExamsProps>()

    return (
        <>
            <FilterField/>
            <Layout className={cl.fillLayout}>
                <div className={cl.card}>
                    <ExamTable
                        onVideoBtnClick={context.openTab}
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

