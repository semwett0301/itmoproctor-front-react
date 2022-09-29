import React, {FC} from 'react';
import {Table} from "@consta/uikit/Table";
import {examTableRow} from "../../mockData/examTableData";
import {columns} from "./tableRowModel";
import cl from './ExamTable.module.scss'

const ExamTable:FC = () => {

    return (
            <Table
                rows={examTableRow}
                columns={columns}
                zebraStriped={'odd'}
                borderBetweenColumns
                borderBetweenRows
                className={cl.table}
            />
    );
};

export default ExamTable;