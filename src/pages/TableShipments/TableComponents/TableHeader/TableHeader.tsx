import React from 'react';

import { Button } from 'components';
import { ModalBasic } from 'components/Modals';
import { WithSelected } from "..";
import { ColumnChooser } from '..';

import "./tableHeader.css"


import type { IColumnData, IRowData, ITableSettings } from "../../TableWrapper";

interface ITableProps {
  setPageSize: (pageSize: number) => void,
  selectedRows: object[],
  addColumn: (column: IColumnData) => void,
  deleteColumn: (column: IColumnData) => void,
  columns: Array<IColumnData>,
  deleteRow: (row: IRowData) => void,
  tableSettings: ITableSettings,
  totalProducts: number,
  setTablePageSize: (pageSize: number) => void,
  setColumnData: (data: Array<IColumnData>) => void
}

function TableHeader({ setPageSize, selectedRows, addColumn, deleteColumn, columns, deleteRow, tableSettings, totalProducts, setTablePageSize, setColumnData }: ITableProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectLimitOptions] = React.useState<Array<number>>([10, 20, 30, 100]);

  const currentSeller = {
    info: {
      sellerName: "Test"
    }
  }

  const pageSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setTablePageSize(parseInt(e.target.value));
  };

  return (
    <>
      <header className="py-4 px-4 border-b border-slate-200 table-header">
        <div></div>
        <div className='right-column'>
          <div className="flex items-center">
            <WithSelected deleteRow={deleteRow} selectedRows={selectedRows} />
          </div>
          <div>
            <Button children={undefined}></Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default TableHeader;
