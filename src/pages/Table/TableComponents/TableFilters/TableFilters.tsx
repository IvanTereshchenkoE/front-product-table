import React from 'react';
import isEqual from "lodash.isequal";
import { v4 as uuidv4 } from 'uuid';

import changeIcon from "assets/images/changeIcon.svg";
import filterIcon from "assets/images/filterIcon.svg";
import trashBin from "assets/images/trashBin.svg";

import { tableService } from "api";
import { ComponentsLoader } from 'components';

import type { IFilterOptionsWrapper, ITableSettings, IColumnData } from "../../TableWrapper";
import { ModalBasic } from 'components/Modals';
import { Button } from 'components';

import { TableQueryBuilder } from "../index";
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface ITableSavedFilters {
  setTableSettings: React.Dispatch<React.SetStateAction<ITableSettings>>
  sellerId: string,
  tableSettings: ITableSettings,
  fields: IColumnData[]
}

const TableFilters: React.FC<ITableSavedFilters> = ({ sellerId, setTableSettings, tableSettings, fields }) => {
  const [filtersOpen, setFiltersOpen] = React.useState(true);
  const [filtersLoading, setFiltersLoading] = React.useState(false);
  const [savedFilters, setSavedFilters] = React.useState<IFilterOptionsWrapper[]>([]);
  const [filtersRequestError, setFiltersRequestError] = React.useState<string>("");
  const [unsavedFitltersIds, setUnsavedFiltersIds] = React.useState<Array<string | undefined>>([]);

  const [queryBuilderModalOpen, setQueryBuilderModalOpen] = React.useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = React.useState<IFilterOptionsWrapper>();

  const [filterCreateModalOpen, setFilterCreateModalOpen] = React.useState<boolean>(false);
  const [filterNameValue, setFilterNameValue] = React.useState<string>("");
  const [filterNameValidationError, setFilterNameValidationError] = React.useState<string>("");

  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const [filterToDelete, setFilterToDelete] = React.useState<IFilterOptionsWrapper>();

  // check if table filters apply

  const { t } = useTranslation();

  React.useEffect(() => {
    if (tableSettings && tableSettings.filterBy.hasOwnProperty("id") && savedFilters.length) {
      const savedFilterToChange = savedFilters.find(item => item.id === tableSettings.filterBy.id);
      if (savedFilterToChange) {
        if (!isEqual(savedFilterToChange, tableSettings.filterBy)) {
          if (!unsavedFitltersIds.find(item => item === savedFilterToChange.id)) {
            setUnsavedFiltersIds((prev) => [...prev, savedFilterToChange.id])
          }
          const savedFilterWithoutOld = savedFilters.filter(item => item.id !== savedFilterToChange.id)
          setSavedFilters([...savedFilterWithoutOld, tableSettings.filterBy])
        }
      }
    }
  }, [tableSettings])

  // get saved filters from server

  React.useEffect(() => {
    if (sellerId) {
      setFiltersLoading(true)
      tableService.getSavedTableFilters(sellerId)
        .then(res => {
          if (res.data) {
            setSavedFilters(res.data.tableSavedFilters);
          }
        })
        .catch(err => {
          setFiltersRequestError(err.message);
        })
        .finally(() => setFiltersLoading(false))
    }
  }, [sellerId])

  const toggleOpenSettings = () => {
    setFiltersOpen(!filtersOpen);
  }

  // create table filter logic

  const createModalOpenHanlder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilterCreateModalOpen(true);
  }

  const createTableFiltersHandler = (name: string) => {
    if (!name) {
      setFilterNameValidationError("Недопустимое название фильтра");
    } else {
      const initialFilter = { data: { combinator: "and", not: false, rules: [] }, id: uuidv4(), name: name, sort: {} }
      setFilterCreateModalOpen(false);
      setSavedFilters(prev => [...prev, initialFilter]);
      tableService.createTableFilter(sellerId, initialFilter);
    }
  }

  // set current filter to table settings when works get products effect

  const currentQueryBuilderModalOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: IFilterOptionsWrapper) => {
    e.stopPropagation();
    setSelectedFilter(item);
    setQueryBuilderModalOpen(true)
  }

  // table query builder request with filters by choosed 

  const getProductsHandler = (data: IFilterOptionsWrapper) => {
    setTableSettings((prev: ITableSettings) => {
      return {
        ...prev,
        filterBy: data
      }
    })
  }

  // change existing filter settings

  const changeFilterSettings = (filter: IFilterOptionsWrapper) => {
    setUnsavedFiltersIds((prev) => [...prev.filter(item => item !== filter.id)]);
    const changingFilter = savedFilters.filter(item => item.id === filter.id)[0];
    const savedFiltersWithoutOld = savedFilters.filter(item => item.id !== changingFilter.id);
    changeFilterSettingsRequest(sellerId, filter);
    setSavedFilters([...savedFiltersWithoutOld, filter])
    setSelectedFilter(undefined);
  }

  const changeFilterSettingsRequest = (sellerId: string, data: IFilterOptionsWrapper) => {
    tableService.changeSavedTableFilter(sellerId, data)
      .catch(error => console.error(error))
  }

  // delete filter handler 

  const deleteFilterSetting = (data: IFilterOptionsWrapper | undefined) => {
    setDeleteModalOpen(false);
    if (data) {
      const savedFiltersWithoutDeleted = savedFilters.filter(item => item.id !== data.id);
      setSavedFilters(savedFiltersWithoutDeleted);
      setQueryBuilderModalOpen(false);
      deleteFilterSettingRequest(sellerId, data);
      setSelectedFilter(undefined);
    }
    if (tableSettings && data && tableSettings.filterBy.id === data.id)
      setTableSettings((prev: ITableSettings) => {
        const initialFilter = { combinator: "and", not: false, rules: [] }
        return {
          ...prev,
          filterBy: {
            data: initialFilter
          }
        }
      })
  }

  const deleteFilterSettingRequest = (sellerId: string, data: IFilterOptionsWrapper) => {
    tableService.deleteSavedTableFilter(sellerId, data)
      .catch(error => console.error(error))
  }

  const setFilterToDeleteHandler = (e: React.MouseEvent, data: IFilterOptionsWrapper) => {
    e.stopPropagation();
    setFilterToDelete(data);
    setDeleteModalOpen(true);
  }

  return (
    <>
      {/* ${filtersOpen ? "w-[100%]" : "w-[8%]"} */}
      <div className={`bg-white shadow-lg rounded-sm border w-full ${filtersOpen ? "md:w-[20%]" : "md:w-[10%]"} border-gray-200 transition-all flex flex-col justify-between`}>
        <div>
          <div className='p-5 flex items-center justify-between'>
            <div className='text-gray-800 text-base font-semibold'>
              {filtersOpen ?
                "Сохраненные фильтры" :
                <img src={filterIcon} alt="filters" />
              }
            </div>
            <Button customClassName={`${filtersOpen && "rotate-[-90deg]"} transition-transform`} clickHandler={toggleOpenSettings}>
              <svg width="15" height="11" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.19419 7.78645L0.794189 2.38645L2.19419 0.98645L6.19419 4.98645L10.1942 0.98645L11.5942 2.38645L6.19419 7.78645Z" fill="#94A3B8" />
              </svg>
            </Button>
          </div>
          <hr></hr>
          <div>
            <div className="relative">
              {
                filtersLoading && !savedFilters.length ? (
                  <ComponentsLoader />
                )
                  :
                  !filtersLoading && filtersRequestError ? (
                    <div className='text-center text-red-500 mt-6 px-2'>Произошла ошибка при получении фильтров: {filtersRequestError}</div>
                  )
                    : savedFilters && savedFilters.length ?
                      savedFilters.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => getProductsHandler(item)}
                          className={`${item && item.id && tableSettings.filterBy.id && item.id === tableSettings.filterBy.id && "bg-indigo-100 px-5 text-indigo-500"} group flex items-center justify-between py-4 px-5 cursor-pointer overflow-hidden`}
                        >
                          <div className="flex">
                            <Button customClassName='max-w-[115px] text-ellipsis text-slate-600 font-medium overflow-hidden whitespace-nowrap'>
                              {item.name && item.name}
                            </Button>
                            {
                              unsavedFitltersIds && unsavedFitltersIds.includes(item.id) && (
                                <span className="ml-2">
                                  <svg className="w-4 h-4 flex-shrink-0 fill-current text-yellow-500 mt-[3px] mr-3" viewBox="0 0 16 16">
                                    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                                  </svg>
                                </span>)
                            }
                          </div>
                          {filtersOpen &&
                            <div className="flex md:opacity-0 group-hover:opacity-100 transition absolute right-0">
                              <Button clickHandler={(e) => setFilterToDeleteHandler(e, item)}>
                                <img src={trashBin} alt="delete" />
                              </Button>
                              <Button customClassName="ml-2 md:ml-0 md:mx-2" clickHandler={(e) => currentQueryBuilderModalOpen(e, item)}>
                                <img src={changeIcon} alt="change" />
                              </Button>
                            </div>
                          }
                        </div>
                      ))
                      :
                      <div className='mt-6 px-4 text-center'>Сохраните ваши фильтры и они появятся здесь</div>
              }
            </div>
          </div>
        </div>
        <div className='p-4 md:p-5 text-center'>
          <Button clickHandler={createModalOpenHanlder} appearance="primary">Добавить фильтр</Button>
        </div>
      </div>
      <ModalBasic
        id="queryBuilder-modal"
        title="Сохраненный фильтр"
        modalOpen={queryBuilderModalOpen}
        setModalOpen={setQueryBuilderModalOpen}
        customSize="max-w-screen-xl"
      >
        <TableQueryBuilder
          fields={fields}
          selectedFilter={selectedFilter}
          getProductsHandler={getProductsHandler}
          setSelectedFilter={setSelectedFilter}
          setQueryBuilderModalOpen={setQueryBuilderModalOpen}
          changeFilterSettings={changeFilterSettings}
          deleteFilterSetting={deleteFilterSetting}
        />
      </ModalBasic>
      <ModalBasic
        title="Сохранение фильтра"
        id="save-filter-modal"
        modalOpen={filterCreateModalOpen}
        setModalOpen={setFilterCreateModalOpen}
        customSize="max-w-[26rem]"
      >
        <div className="max-w-sm my-0 mx-auto px-4 py-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-600 text-left font-medium mb-1" htmlFor="filter">Название Фильтра<span className="text-red-500">*</span></label>
            <input
              placeholder="Например: Фильтр 1"
              id="filter"
              value={filterNameValue}
              onFocus={() => setFilterNameValidationError("")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterNameValue((e as any).target.value)}
              className={`form-input ${filterNameValidationError && "border border-red-500"} w-full px-2 py-1`}
              type="text"
              required
            />
            {filterNameValidationError && <div className='text-xs text-red-500 mt-2'>{filterNameValidationError}</div>}
          </div>
          <div className="flex justify-end">
            <Button clickHandler={() => setFilterCreateModalOpen(false)} size="sm" customClassName="mr-2" appearance="tertiary">{t("abort")}</Button>
            <Button clickHandler={() => createTableFiltersHandler(filterNameValue)} size="sm" appearance="primary">{t("try_again")}</Button>
          </div>
        </div>
      </ModalBasic>
      <ModalBasic
        id="delete-filter-modal"
        title="Удалить текущий фильтр"
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        customSize="max-w-[26rem]"
      >
        <div className="max-w-sm my-0 mx-auto px-1 py-4">
          <div className="block text-sm text-center text-gray-600 text-left font-medium mb-4">Вы действительно хотите удалить фильтр <span className="font-bold">{filterToDelete && filterToDelete.name}</span> ?</div>
          <div className="flex justify-center">
            <Button clickHandler={() => setDeleteModalOpen(false)} size="sm" customClassName="mr-2" appearance="tertiary">{t("abort")}</Button>
            <Button clickHandler={() => deleteFilterSetting(filterToDelete)} size="sm" appearance="danger" customClassName="btn-sm bg-red-500 hover:bg-red-600 text-white open-modal">{t("Remove")}</Button>
          </div>
        </div>
      </ModalBasic>
    </>
  );
};

export default TableFilters;
