import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ColumnChooserSidebar, ColumnChooserOptions } from '../..';

import type { IColumnData } from "../../../TableWrapper";

interface IColumnChooserProps {
    addColumn: (column: IColumnData) => void,
    deleteColumn: (column: IColumnData) => void,
    columns: Array<IColumnData>,
    setColumnData: (data: Array<IColumnData>) => void
}

function ColumnChooser({ addColumn, deleteColumn, columns, setColumnData }: IColumnChooserProps) {

    const toggleColumnHandler = (data: IColumnData) => {
        let isDataInColumns = columns.filter(item => item.id === data.id).length > 0;
        if (isDataInColumns) {
            deleteColumn(data);
        } else {
            if (data.accessor === "id") {
                addColumn({ Header: data.Header, accessor: data.accessor, id: data.id, Cell: (row: any) => <div>{row.value}</div> })
            } else {
                addColumn({ Header: data.Header, accessor: `attributes.${data.accessor}`, id: data.id })
            }
        }
    }

    return (
        <div className="flex w-full py-4 px-5 h-full">
            <DndProvider backend={HTML5Backend}>
                <ColumnChooserSidebar
                    deleteColumn={deleteColumn}
                    columns={columns}
                    setColumnData={setColumnData}
                />
            </DndProvider>
            <ColumnChooserOptions
                toggleColumnHandler={toggleColumnHandler}
                columns={columns}
            />
        </div>
    )
}

export default ColumnChooser;