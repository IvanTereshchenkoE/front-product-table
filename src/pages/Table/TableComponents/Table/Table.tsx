import React from 'react';
import { useTable, usePagination, useRowSelect, Column } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { SetStateAction } from 'react';

import { ComponentsLoader, Button } from 'components';
import { Paginator, TableHeader, ActionWithRow, CustomTableCell, IndeterminateCheckbox, CustomFilterColumn, TableSearch } from "..";

import sortDisable from "assets/images/sortDisable.svg";
import sortASC from "assets/images/sortASC.svg";
import sortDESC from "assets/images/sortDESC.svg";
import trashBin from "assets/images/trashBin.svg";
import pin from "assets/images/pin.svg";
import pinActive from "assets/images/pinActive.svg";
import "./Table.scss";

import type { IColumnData, IRowData, ITableSettings, IFilterOptionsWrapper } from "../../TableWrapper";

// Table

interface ITableProps {
  columns: Array<IColumnData>,
  data: Array<object>,
  updateProduct: (rowIndex: number, id: string, columnId: string, value: string) => void,
  addColumn: (column: IColumnData) => void,
  deleteColumn: (column: IColumnData) => void,
  deleteRow: (row: IRowData) => void,
  rowDataLoading: boolean,
  productsRequestError: string,
  tableSettings: ITableSettings,
  setTableSettings: (data: SetStateAction<ITableSettings>) => void,
  totalProducts: number,
  setRowDataLoading: (data: boolean) => void,
  tableSettingsLoaded: boolean,
  togglePinColumnHandler: (data: Column) => void,
  setColumnData: (data: Array<IColumnData>) => void,
  setTableSettingsToEqualCheck: React.Dispatch<React.SetStateAction<IFilterOptionsWrapper | undefined>>
}

const Table: React.FC<ITableProps> = React.memo((
  {
    columns,
    data,
    updateProduct,
    addColumn,
    deleteColumn,
    deleteRow,
    rowDataLoading,
    productsRequestError,
    tableSettings,
    setTableSettings,
    totalProducts,
    setRowDataLoading,
    tableSettingsLoaded,
    togglePinColumnHandler,
    setColumnData,
    setTableSettingsToEqualCheck
  }) => {

  const defaultColumn = React.useMemo(() => ({
    Filter: CustomFilterColumn,
    Cell: CustomTableCell,
    minWidth: 290,
    width: 290,
    maxWidth: 289
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    selectedFlatRows,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateProduct,
      autoResetFilters: false,
      autoResetSortBy: false
    },
    useSticky,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className='flex flex-col'>
              <IndeterminateCheckbox name={''} {...getToggleAllRowsSelectedProps()} />
              <Button clickHandler={removeAllFilters} customClassName='mt-4'>
                <img src={trashBin} alt="delete" />
              </Button>
            </div>
          ),

          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox name={''} {...row.getToggleRowSelectedProps()} />
            </div>
          ),

          minWidth: 48,
          width: 48,
          originalWidth: 48,
        },
        ...columns,
      ])
    }
  )

  const removeAllFilters = () => {
    setTableSettings((prev) => {
      return {
        ...prev,
        filterBy: {
          data: {
            rules: [],
            combinator: prev.filterBy.data.combinator,
            not: prev.filterBy.data.not,
          }
        },
        sortBy: {}
      }
    })
  }

  React.useEffect(() => {
    if (tableSettingsLoaded) {
      setPageSize(tableSettings.limit)
    }
  }, [tableSettingsLoaded])

  const setTablePageSize = (pageSize: number) => {
    setTableSettings((prev: ITableSettings) => {
      return {
        ...prev,
        limit: pageSize
      }
    })
  }

  // sort logic

  const setSortColumn = (columnHeader: string | undefined, sortIndex: "desc" | "asc" | "") => {
    if (sortIndex) {
      setTableSettings((prev) => {
        return {
          ...prev,
          sortBy: {
            columnHeader: columnHeader,
            sortIndex: sortIndex
          }
        }
      })
    } else {
      setTableSettings((prev) => {
        return {
          ...prev,
          sortBy: {}
        }
      })
    }
  }

  const renderSwitchSort = (sortBy: string, columnHeader: string | undefined) => {
    switch (sortBy) {
      case "asc": return (
        <Button clickHandler={() => setSortColumn(columnHeader, "")} customClassName="mr-2 inline-block">
          <img src={sortASC} alt="asc" />
        </Button>
      )

      case "desc": return (
        <Button clickHandler={() => setSortColumn(columnHeader, "asc")} customClassName="mr-2 inline-block">
          <img src={sortDESC} alt="desc" />
        </Button>
      )

      default: (
        <Button clickHandler={() => setSortColumn(columnHeader, "")} customClassName="mr-2 inline-block">
          <img src={sortDisable} alt="standart" />
        </Button>
      )
    }
  }

  return (
    <>
      <div className="overflow-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <TableHeader
          setTablePageSize={setTablePageSize}
          tableSettings={tableSettings}
          totalProducts={totalProducts}
          setPageSize={setPageSize}
          selectedRows={selectedFlatRows}
          addColumn={addColumn}
          deleteColumn={deleteColumn}
          columns={columns}
          deleteRow={deleteRow}
          setColumnData={setColumnData}
        />
        <div className={`${rowDataLoading ? "overflow-hidden" : "overflow-x-auto"} relative ${productsRequestError ? "min-h-[2rem]" : "min-h-[37rem]"} max-h-[37rem]`}>
          {
            !rowDataLoading && data.length <= 0 && !productsRequestError &&
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">Не найдено ни одного продукта</div>
          }
          {rowDataLoading &&
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"><ComponentsLoader size={100} /></div>
          }
          <table className="table sticky border-collapse [border-spacing:0.75rem] max-h-[37rem] border border-slate-200" {...getTableProps()}>
            <thead className="header">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => {
                    return (
                      <th 
                        className={`column-title m-0 p-4 border border-slate-200 bg-white ${i === 0 ? "sticky z-10 left-[0px]" : "z-2"}`} 
                        data-sticky-td={column.id === "selection" && true} 
                        data-sticky-last-left-td={column.id === "selection"}

                        {...column.getHeaderProps()}
                        >
                        {
                          column.id !== "selection" &&
                          (
                            (tableSettings && Object.keys(tableSettings.sortBy).length && tableSettings.sortBy.columnHeader === column.Header && tableSettings.sortBy.sortIndex) ?
                              (
                                renderSwitchSort(tableSettings.sortBy.sortIndex, column.Header as string)
                              )
                              :
                              tableSettings &&
                              (
                                <Button clickHandler={() => setSortColumn(column.Header as string, "desc")} customClassName="mr-2 inline-block">
                                  <img src={sortDisable} alt="standart" />
                                </Button>
                              )
                          )
                        }
                        {column.render("Header")}
                        {
                          column.id !== "selection" &&
                          <Button clickHandler={() => togglePinColumnHandler(column)} customClassName="ml-2 inline-block">
                            {
                              column.hasOwnProperty("sticky") && column.sticky ? <img src={pinActive} alt="pin" /> : <img src={pin} alt="pin active" />
                            }
                          </Button>
                        }
                        <div className="mt-2">{column.id !== "selection" ?
                          <TableSearch
                            tableSettingsLoaded={tableSettingsLoaded}
                            tableSettings={tableSettings}
                            column={column}
                            setRowDataLoading={setRowDataLoading}
                            setTableSettingsToEqualCheck={setTableSettingsToEqualCheck}
                          />
                          :
                          null
                        }</div>
                      </th>
                    )
                  })}
                  <td>
                    <div className="m-0 p-4 bg-white sticky z-10 right-[-0.1rem]"></div>
                  </td>
                </tr>
              ))}
            </thead>
            {
              !rowDataLoading && data.length > 0 && !productsRequestError &&
              <tbody {...getTableBodyProps()} className="body">
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        if (cell.column.id === "selection") {
                          return <td className="m-0 p-4 border border-slate-200 bg-white z-10 sticky left-0 z-[3]" data-sticky-td="true" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        }
                        return <td className={`m-0 p-4 border border-slate-200 bg-white z-10`} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                      <td className="m-0 p-4 border border-slate-200 bg-white sticky right-0 z-10" data-sticky-td="true" data-sticky-first-right-td="true" {...row.getRowProps()}>
                        <ActionWithRow deleteRow={deleteRow} row={row.original} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            }
          </table>
        </div>
        {
          productsRequestError &&
          <div className="font-semibold text-center my-4 text-red-500">При получении продуктов произошла ошибка: {productsRequestError}</div>
        }
      </div>
      {tableSettingsLoaded &&
        <Paginator
          tableSettings={tableSettings}
          pageSize={pageSize}
          setTableSettings={setTableSettings}
          totalProducts={totalProducts}
        />}
    </>
  )
})

export default Table;