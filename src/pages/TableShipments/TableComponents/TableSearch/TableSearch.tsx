import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ITableSettings, IFilterOption, IFilterOptionsWrapper } from '../../TableWrapper';
import { flatData } from '../../utils';

import trashBin from "assets/images/trashBin.svg";
import { Button, Input } from 'components';

interface ITableSearchProps {
    column: any,
    setRowDataLoading: (data: boolean) => void,
    tableSettings: ITableSettings,
    tableSettingsLoaded: boolean
    setTableSettingsToEqualCheck: React.Dispatch<React.SetStateAction<IFilterOptionsWrapper | any | undefined>>
}

const TableSearch: React.FC<ITableSearchProps> = ({ column, setRowDataLoading, tableSettings, tableSettingsLoaded, setTableSettingsToEqualCheck }) => {
    const [value, setValue] = React.useState<string>("");
    const [firstRender, setFirstRender] = React.useState(true);
    const [filteredBy, setFilteredBy] = React.useState<string>("");

    React.useEffect(() => {
        if (!firstRender) {
            const timer = setTimeout(() => {
                let filteredOptions: any;
                if (value.length <= 0) {
                    filteredOptions = deleteFilterOptionWithoutValue(column.Header)
                }
                if (filteredOptions) {
                    const filter = { ...tableSettings.filterBy, data: { ...tableSettings.filterBy.data, rules: [...filteredOptions] } }
                    setTableSettingsToEqualCheck(filter)
                } else {
                    const otherRules = tableSettings.filterBy.data.rules.filter(item => item.field !== column.Header);
                    let filterContainsId: IFilterOption | undefined | string = tableSettings.filterBy.data.rules.find(item => item.operator === "contains");
                    if (filterContainsId && filterContainsId.id) {
                        filterContainsId = filterContainsId.id
                    }
                    const filteredRules = tableSettings.filterBy.data.rules.filter(item => item.field === column.Header && item.operator !== "contains");
                    const filter = { ...tableSettings.filterBy, data: { ...tableSettings.filterBy.data, rules: [...filteredRules.concat(otherRules), { value: value, id: filterContainsId ? filterContainsId : uuidv4(), field: column.Header, valueSource: 'value', operator: "contains" }] } }
                    setTableSettingsToEqualCheck(filter);
                }

                setRowDataLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [value]);

    const deleteFilterOptionWithoutValue = (columnHeader: string) => {
        let ruleToDelete = tableSettings.filterBy.data.rules.find((item: any) => item.field === columnHeader && item.operator === "contains");
        const rulesWithoutRemoted = tableSettings.filterBy.data.rules.filter(item => item !== ruleToDelete);
        return rulesWithoutRemoted;
    }

    React.useEffect(() => {
        if (tableSettingsLoaded && tableSettings && tableSettings.filterBy.data && tableSettings.filterBy.data.rules) {
            tableSettings.filterBy.data.rules.forEach((item) => {
                if (item.field === column.Header && item.operator === "contains" && item.value) {
                    setValue(item.value);
                }
            })
            if (value.length) {
                const filterColInRules = tableSettings.filterBy.data.rules.filter(item => item.field === column.Header).length < 1;
                filterColInRules && setValue("")
            }
            setTimeout(() => {
                setFirstRender(false);
            })
        }
    }, [tableSettingsLoaded, tableSettings]);


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setRowDataLoading(true)
    }

    const clearFilter = () => {
        if (value.length > 0) {
            setValue("");
            setRowDataLoading(true);
        }
    }

    React.useEffect(() => {
        if (tableSettings && tableSettingsLoaded && tableSettings.filterBy.data && tableSettings.filterBy.data.rules && tableSettings.filterBy.data.rules.length) {
            const flattedRules = flatData(tableSettings.filterBy.data.rules, "rules");
            const filteredRulesByColumn: IFilterOption[] = flattedRules.filter(item => item.field === column.Header);
            if (filteredRulesByColumn && filteredRulesByColumn.length && filteredRulesByColumn[0].operator) {
                filteredRulesByColumn.length > 1 ? setFilteredBy("Multi filter") : filteredRulesByColumn[0].operator !== "contains" ? setFilteredBy(filteredRulesByColumn[0].operator) : setFilteredBy("")
            } else {
                setFilteredBy("");
            }
        } else {
            setFilteredBy("");
        }
    }, [tableSettings, tableSettingsLoaded])

    return (
        <div className="flex flex-col justify-between relative">
            <div className="mb-1">
                <Input value={value} changeHandler={changeHandler} name="tableFilter" placeholder="Фильтр" customClassName="max-w-[90%]" />
                <Button clickHandler={clearFilter} customClassName='ml-2'>
                    <img src={trashBin} alt="delete" />
                </Button>
            </div>
            <div>
                {filteredBy && <div className="text-xs absolute left-[50%] translate-x-[-50%] bottom-[-15px]">Filter: {filteredBy}</div>}
            </div>
        </div>  
    )
}

export default TableSearch;