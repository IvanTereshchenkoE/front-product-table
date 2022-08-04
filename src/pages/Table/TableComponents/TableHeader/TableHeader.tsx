import React from 'react';

import { Button } from 'components';
import { ModalBasic } from 'components/Modals';
import { WithSelected } from "..";
import { ColumnChooser } from '..';

import burgerIcon from 'assets/images/burger-icon.svg';

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

  const modalOpenHanlder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true)
  }

  return (
    <>
      <header className="py-4 px-4 border-b border-slate-200">
        <div className="flex flex-col itens-start md:items-center md:flex-row md:justify-between">
          <div className="flex items-center">
            <Button clickHandler={modalOpenHanlder} customClassName="mr-3 open-modal">
              <img src={burgerIcon} alt="menu" />
            </Button>
            {currentSeller && <div className="text-gray-800 text-base font-semibold">{currentSeller.info?.sellerName}</div>}
          </div>
          <div className="flex items-center my-2 md:my-0">
            <div className="flex items-center">
              <div>Показать от 1 до</div>
              <div className="mx-2">
                <select
                  value={tableSettings && tableSettings.limit}
                  onChange={(e) => pageSizeHandler(e)}
                  style={{ border: '1px solid #e2e8f0' }}
                  className="border border-slate-200 py-1">
                  {selectLimitOptions.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>из {totalProducts && totalProducts} результатов</div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <WithSelected deleteRow={deleteRow} selectedRows={selectedRows} />
        </div>
      </header>
      <ModalBasic id="true" customSize="max-w-5xl" title="Выбор колонок таблицы" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ColumnChooser setColumnData={setColumnData} addColumn={addColumn} deleteColumn={deleteColumn} columns={columns} />
      </ModalBasic>
    </>
  );
}

export default TableHeader;
