import React from "react";
import { createSelector } from "reselect";
import isEqual from "lodash.isequal";

import { rowDataDeFormatter, rowsDataFormatter } from "./utils";
import Table from "./TableComponents/Table/Table";
import { TableFilters } from "./TableComponents";

import { sellerProductsService, tableService } from "../../api";

export interface IRowData {
    id: string,
    attributes: Array<object>
}

export interface IColumnData {
    Header: string,
    accessor: string,
    sticky?: string,
    id: string,
    Cell?: (row: any) => JSX.Element
}

export interface ITableSort {
    columnHeader?: string,
    sortIndex?: string
}

export interface IFilterOptionsWrapper {
    id?: string,
    name?: string,
    data: IFilterOption,
}

export interface IFilterOption {
    id?: string,
    value?: string,
    field?: string,
    rules: Array<IFilterOption>,
    operator?: string,
    combinator: string,
    not?: boolean
}

export interface ITableSettings {
    limit: number,
    page: number,
    filterBy: IFilterOptionsWrapper,
    sortBy: ITableSort,
}

const TableShipments: React.FC = () => {

    const [rowData, setRowData] = React.useState<Array<IRowData>>([]);
    const [columnData, setColumnData] = React.useState<Array<IColumnData>>([
        {
            Header: "id",
            accessor: "id",
            id: "1",
            Cell: (row: any) => <div>{row.value}</div>
        }
    ]);
    const [rowDataLoading, setRowDataLoading] = React.useState<boolean>(true);
    const [productsRequestError, setProductsRequestError] = React.useState<string>("");
    const [totalProducts, setTotalProducts] = React.useState<number>(0);
    const [tableSettings, setTableSettings] = React.useState<ITableSettings>({ limit: 10, page: 1, filterBy: { data: { combinator: "and", not: false, rules: [] } }, sortBy: {} });
    const [tableSettingsLoaded, setTableSettingsLoaded] = React.useState<boolean>(false);

    const [tableSettingsToEqualCheck, setTableSettingsToEqualCheck] = React.useState<IFilterOptionsWrapper>();

    const { sellerId } = {sellerId: "1"};

    // console.log(columnData);

    // Update product field

    const updateProduct = (rowIndex: number, columnHeader: string, value: string) => {
        const product = updateRowData(rowIndex, columnHeader, value);
        let deFormattedProduct = rowDataDeFormatter(product);

        sellerProductsService.changeSellerProduct({ product: deFormattedProduct, sellerId: sellerId })
            .catch(err => console.error(err.message))
    }

    const updateRowData = (rowIndex: number, columnHeader: string, value: string) => {
        let productToUpdate;
        columnHeader = columnHeader.split(".")[1] ? columnHeader.split(".")[1] : columnHeader
        setRowData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return productToUpdate = {
                        ...old[rowIndex],
                        attributes: { ...old[rowIndex].attributes, [columnHeader]: value }
                    }
                }
                return row
            })
        )
        return productToUpdate
    }

    // delete columns and rows handlers

    const deleteRow = (data: IRowData) => {
        if (Array.isArray(data) && data.length > 0) {
            let oldArr = [...rowData];
            let rowsToDelete: Array<IRowData> = [];
            data.forEach((obj: IRowData) => {
                rowsToDelete.push(obj)
                oldArr = oldArr.filter(item => item.id !== obj.id);
            })
            setRowData(oldArr);
            deleteRowFromServer(rowsToDelete);
        } else if (Object.keys(data).length > 0) {
            let filteredRows = rowData.filter(item => item.id !== data.id);
            setRowData(filteredRows);
            deleteRowFromServer(data);
        }
    }

    const deleteRowFromServer = (data: IRowData | Array<IRowData>) => {
        sellerProductsService.deleteSellerProduct({ product: data, sellerId: sellerId })
            .catch(err => console.error(err.message))
    }

    const addColumn = (column: IColumnData) => {
        setColumnData([...columnData, column]);
    }

    const deleteColumn = (column: IColumnData) => {
        const dataWithoutColumn = columnData.filter(item => item.Header !== column.Header);
        setColumnData(dataWithoutColumn);
    }

    // toggle pin column handler

    const togglePinColumnHandler = (data: any) => {
        const columnAccessor = columnData.find(item => item.id === data.id)?.accessor;
        let withoutThisColumn = columnData.filter(item => item.Header !== data.Header);
        if (data.hasOwnProperty("sticky") && data.sticky && columnAccessor) {
            setColumnData([...withoutThisColumn, { Header: data.Header, id: data.id, Cell: data.Cell, accessor: columnAccessor }])
        } else if (columnAccessor) {
            let arrOfColumns = [...withoutThisColumn, { Header: data.Header, accessor: columnAccessor, id: data.id, sticky: "left", Cell: data.Cell }];
            let withSticky: (IColumnData)[] = [];
            let withoutSticky: (IColumnData)[] = [];
            arrOfColumns.forEach(item => item.hasOwnProperty("sticky") && item.sticky ? withSticky.push(item) : withoutSticky.push(item));
            setColumnData([...withSticky, ...withoutSticky])
        }
    }

    // get global table settings

    const getGlobalSettings = () => {
        if (sellerId) {
            tableService.getGlobalTableSettings(sellerId)
                .then(res => {
                    if (res.data) {
                        let columnsWithFunctions = res.data.columnData.map((item: IColumnData) => {
                            if (item.accessor === "id") {
                                return { Header: item.Header, accessor: item.accessor, sticky: item.sticky ? item.sticky : null, id: item.id, Cell: (row: any) => <div>{row.value}</div> }
                            } else {
                                return item
                            }
                        })
                        setTableSettings(res.data.settings);
                        setColumnData(columnsWithFunctions);
                    }
                })
        }
    }

    // save and get options logic

    React.useEffect(() => {
        if (tableSettings && tableSettingsLoaded && columnData) {
            tableService.setTableSettings(sellerId, tableSettings, columnData)
                .catch(err => console.error(`При сохранении настроек таблицы произошла ошибка: ${err.message}`))
        }
    }, [tableSettings, tableSettingsLoaded, columnData])

    React.useEffect(() => {
        if (sellerId) {
            tableService.getTableSettings(sellerId)
                .then((res) => {
                    if (res.data && Object.keys(res.data).length && res.data.tableSetting) {
                        let columnsWithFunctions = res.data.tableSetting.columnData.map((item: IColumnData) => {
                            if (item.accessor === "id") {
                                return { Header: item.Header, accessor: item.accessor, sticky: item.sticky ? item.sticky : null, id: item.id, Cell: (row: any) => <div>{row.value}</div> }
                            } else {
                                return item
                            }
                        })
                        setColumnData(columnsWithFunctions);
                        setTableSettings(res.data.tableSetting.settings);
                        setTableSettingsLoaded(true);
                    } else {
                        getGlobalSettings();
                    }
                }).catch(err => console.error(`При получении настроек таблицы произошла ошибка: ${err.message}`))
                .finally(() => setTableSettingsLoaded(true))
        }
    }, [sellerId])

    // get products effect

    React.useEffect(() => {
        if (sellerId && tableSettingsLoaded) {
            setRowDataLoading(true);
            sellerProductsService.getSellerProducts(
                sellerId,
                {
                    limit: tableSettings.limit,
                    page: tableSettings.page,
                    filterBy: tableSettings.filterBy,
                    sortBy: tableSettings.sortBy
                }
            )
                .then(res => {

                    if (Object.keys(res.data).length) {
                        let formattedProducts = rowsDataFormatter(res.data.products);
                        setRowData(formattedProducts);
                        setTotalProducts(res.data.total);
                        setRowDataLoading(false);
                    }
                }, err => {
                    setProductsRequestError(err.response.data.error);
                    setRowDataLoading(false);
                }).catch(err => {
                    setProductsRequestError(err.message);
                    setRowDataLoading(false);
                }).finally(() => setRowDataLoading(false))
        }
    }, [sellerId, tableSettingsLoaded, tableSettings])

    // check if search filters isnt equal to tableSettings

    React.useEffect(() => {
        if (tableSettingsToEqualCheck) {
            if (!isEqual(tableSettingsToEqualCheck, tableSettings.filterBy)) {
                setTableSettings((prev: ITableSettings) => {
                    return {
                        ...prev,
                        filterBy: tableSettingsToEqualCheck
                    }
                })
            }
        }
    }, [tableSettingsToEqualCheck])

    const columnDataMock = [
        {Header: "Наименование", accessor: "attributes.Наименование", id: 1},
        {Header: "Тип", accessor: "attributes.Тип", id: 2},
        {Header: "Адрес", accessor: "attributes.Адрес", id: 3},
        {Header: "Источник", accessor: "attributes.Источник", id: 4},
        {Header: "Частота обновления", accessor: "attributes.Частота обновления", id: 5},
    ]

    const rowDataMock : any = [
        {id: 1, attributes: {
            "Наименование" : "Основной склад",
            "Тип" : "FBS",
            "Адрес" : "ул. Петербургская, д. 52, г. Казань, Татарстан, 420074, Россия",
            "Источник" : "YML",
            "Частота обновления" : "1 ч",
            "статус подключения" : "INACTIVE"
        }},
        {id: 2, attributes: {
            "Наименование" : "Казань",
            "Тип" : "Поставщик",
            "Адрес" : "ул. Петербургская, д. 52, г. Казань, Татарстан, 420074, Россия",
            "Источник" : "Мой Склад",
            "Частота обновления" : "2 дн",
            "статус подключения" : "ACTIVE"
        }},
        {id: 3, attributes: {
            "Наименование" : "Супер огромный склад 3000",
            "Тип" : "Поставщик",
            "Адрес" : "",
            "Источник" : "Битрикс24",
            "Частота обновления" : "5 мин",
            "статус подключения" : "ERROR"
        }},
        {id: 4, attributes: {
            "Наименование" : "Москва",
            "Тип" : "FBS",
            "Адрес" : "",
            "Источник" : "CSV",
            "Частота обновления" : "1д 3ч",
            "статус подключения" : "ERROR"
        }},
    ]


    return (
        <div className="p-4">
            <div className='flex flex-col md:flex-row justify-between mt-6'>
                <TableFilters
                    fields={columnData}
                    sellerId={sellerId}
                    setTableSettings={setTableSettings}
                    tableSettings={tableSettings}
                />
                <div className='mt-4 md:ml-4 md:mt-0 w-full max-w-full overflow-hidden'>
                    <Table
                        setColumnData={setColumnData}
                        togglePinColumnHandler={togglePinColumnHandler}
                        tableSettingsLoaded={tableSettingsLoaded}
                        setRowDataLoading={setRowDataLoading}
                        totalProducts={totalProducts}
                        columns={columnDataMock}
                        tableSettings={tableSettings}
                        setTableSettings={setTableSettings}
                        data={rowDataMock}
                        updateProduct={updateProduct}
                        addColumn={addColumn}
                        deleteColumn={deleteColumn}
                        deleteRow={deleteRow}
                        rowDataLoading={rowDataLoading}
                        productsRequestError={productsRequestError}
                        setTableSettingsToEqualCheck={setTableSettingsToEqualCheck}
                    />
                    
                </div>
            </div>
        </div>
    )
}

export default TableShipments;
