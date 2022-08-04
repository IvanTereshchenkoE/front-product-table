import React from 'react';

import { ComponentsLoader } from '../../../../../components';
import { marketCategoriesService } from '../../../../../api';
import { Select } from "../../../../../components/Select";

import type { IColumnData } from "../../../TableWrapper";

interface IColumnChooserOptionsProps {
    toggleColumnHandler: (data: IColumnData) => void,
    columns: Array<IColumnData>
}

const markets = [
    { value: "system", label: "Main fields" },
    { value: "Yandexmarket", label: "Yandex market" },
    { value: "Ozon", label: "Ozon" },
    { value: "Sbermegamarket", label: "Sber megamarket" },
    { value: "Wildberries", label: "WildBerries" }
]

interface ISelectedMarket {
    value: string,
    label: string
}

interface IProductCategory {
    name: string,
    id: string | number
}

interface IProductField {
    id: string | number,
    name: string
}

const ColumnChooserOptions: React.FC<IColumnChooserOptionsProps> = ({ toggleColumnHandler, columns }) => {

    const [selectedMarket, setSelectedMarket] = React.useState<ISelectedMarket>();
    const [selectedCategory, setSelectedCategory] = React.useState<IProductCategory | null>();
    const [productCategories, setProductCategories] = React.useState<Array<IProductCategory>>([]);
    const [marketDefaultFields, setMarketDefaultFields] = React.useState<Array<IProductField>>([]);
    const [productFields, setProductFields] = React.useState<Array<IProductField>>([]);
    const [fieldsLoading, setFieldsLoading] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const { sellerId } = {sellerId: "1"}

    const getFieldsAndCategoriesForMarket = (marketName: string) => {
        setFieldsLoading(true);
        if(sellerId) {
            Promise.all([
                marketCategoriesService.getCategoriesForMarket({ sellerId, marketName }),
                marketCategoriesService.getDefaultMarketCategories({ sellerId, marketName })
            ])
                .then(responses => {
                    setProductCategories(responses[0].data.categories);
                    setMarketDefaultFields([...responses[1].data.fields]);
                    setProductFields([...responses[1].data.fields])
                    setFieldsLoading(false);
                }, err => {
                    setErrorMessage(err.response.data.error);
                    setFieldsLoading(false);
                }).catch(err => {
                    setErrorMessage(err.message);
                    setFieldsLoading(false);
                })
        }
    }

    React.useEffect(() => {
        if (sellerId && selectedCategory && selectedMarket) {
            setFieldsLoading(true);
            marketCategoriesService.getFieldsForCategory({ sellerId, marketName: selectedMarket.value, category: selectedCategory.name })
                .then((res) => {
                    if (Object.values(res.data).length > 0) {
                        setProductFields([...marketDefaultFields, ...res.data.fields]);
                        setFieldsLoading(false);
                    } else {
                        setProductFields(marketDefaultFields)
                        setFieldsLoading(false);
                    }
                }, err => {
                    setErrorMessage(err.response.data.error);
                    setFieldsLoading(false);
                }).catch(err => {
                    setErrorMessage(err.message);
                    setFieldsLoading(false);
                })
        }
    }, [selectedCategory])

    React.useEffect(() => {
        if(sellerId) {
            if (!selectedMarket) {
                setSelectedMarket(markets[0]);
            } else if (selectedMarket) {
                getFieldsAndCategoriesForMarket(selectedMarket.value)
            }
        }
    }, [sellerId, selectedMarket])

    const marketChangeHandler = (market: ISelectedMarket) => {
        setSelectedMarket(market);
        setSelectedCategory(null);
    }

    const categoryChangeHandler = (category: IProductCategory) => {
        setSelectedCategory(category);
    }

    return (
        <div className="w-8/12 ml-10 max-w-lg">
            <div className="mb-4 font-bold">Добавить колонки:</div>
            <div className="flex flex-col max-h-40 flex-wrap">
                {
                    marketDefaultFields ?
                        marketDefaultFields.map((item) => (
                            <React.Fragment key={item.id}>
                                <label style={{ width: "170px" }} className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                                    <input
                                        onChange={() => toggleColumnHandler({ Header: item.name, accessor: item.name, id: item.id.toString() })}
                                        checked={(columns.filter((col) => col.id === item.id)).length > 0}
                                        type="checkbox"
                                        className="form-checkbox mr-2" />
                                    {item.name}
                                </label>
                            </React.Fragment>
                        ))
                        :
                        <div>Выберите категории и добавьте колонки в таблицу</div>
                }
            </div>
            <hr className="my-6"></hr>
            <div>
                <div className="flex justify-between mb-4">
                    <div>
                        <div className="mb-2 font-bold">Маркетплейс</div>
                        <Select
                            onChangeHandler={marketChangeHandler}
                            selected={selectedMarket ? selectedMarket : markets[0]} options={markets} />
                    </div>
                    <div>
                        <div className="mb-2 font-bold">Категории</div>
                        <Select
                            onChangeHandler={categoryChangeHandler}
                            selected={selectedCategory ? selectedCategory : { name: "Выберите категорию", id: "0" }}
                            options={productCategories}
                            customLabel="name"
                            customValue="id" />
                    </div>
                </div>
                {errorMessage && <div className="text-red-500 mb-2 mt-2 text-center">{errorMessage}</div>}
                <div className="flex flex-wrap justify-between">
                    {
                        productFields && productFields.length > 0
                            ?
                            fieldsLoading ? <ComponentsLoader /> :
                                productFields.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <label style={{ width: "200px" }} className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                                            <input
                                                onChange={() => toggleColumnHandler({ Header: item.name, accessor: item.name, id: item.id.toString() })}
                                                checked={(columns.filter((col) => col.id === item.id)).length > 0}
                                                type="checkbox"
                                                className="form-checkbox mr-2" />
                                            {item.name}
                                        </label>
                                    </React.Fragment>
                                ))
                            :
                            <div className="font-bold">Не найдено ни одного поля</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ColumnChooserOptions;
