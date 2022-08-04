import React from 'react';
import QueryBuilder, { RuleGroupType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';

import "./TableQueryBuilder.scss";

import { Button } from '../../../../components';
import type { IColumnData, IFilterOption, IFilterOptionsWrapper } from "../../TableWrapper";

interface ITableQueryBuilder {
  fields: IColumnData[],
  selectedFilter: IFilterOptionsWrapper | undefined,
  getProductsHandler: (filters: IFilterOptionsWrapper) => void,
  setSelectedFilter: React.Dispatch<React.SetStateAction<IFilterOptionsWrapper | undefined>>,
  changeFilterSettings: (data: IFilterOptionsWrapper) => void,
  setQueryBuilderModalOpen: (data: boolean) => void,
  deleteFilterSetting: (data: IFilterOptionsWrapper) => void
}

interface IQueryBuilderFields {
  name: string,
  label: string
}

const TableQueryBuilder: React.FC<ITableQueryBuilder> = ({
  fields,
  selectedFilter,
  getProductsHandler,
  setSelectedFilter,
  changeFilterSettings,
  setQueryBuilderModalOpen,
}) => {
  const [queryBuilderFields, setQueryBuilderFields] = React.useState<IQueryBuilderFields[]>([]);
  const [query, setQuery] = React.useState<RuleGroupType>({
    combinator: 'and',
    not: false,
    rules: [],
  });

  React.useEffect(() => {
    if (selectedFilter && selectedFilter.data && selectedFilter.data.rules) {
      setQuery(selectedFilter.data)
    }
  }, [selectedFilter]);


  React.useEffect(() => {
    if (fields && fields.length) {
      const mappedFields = fields.map((item) => {
        return { name: item.Header, label: item.Header };
      });
      setQueryBuilderFields(mappedFields);
    }
  }, [fields])

  const runQueryHandler = () => {
    if (selectedFilter) {
      getProductsHandler({ id: selectedFilter.id, name: selectedFilter.name, data: query as IFilterOption });
    }
    setQueryBuilderModalOpen(false);
  }

  const saveQueryFilterHandler = () => {
    setQueryBuilderModalOpen(false);
    changeFilterSettings({ data: query as IFilterOption, id: selectedFilter?.id, name: selectedFilter?.name });
  }

  const deleteRule = (ruleId: string) => {
    if (selectedFilter) {
      const filteredRules = selectedFilter.data.rules.filter(item => item.id !== ruleId);
      setSelectedFilter((prev: IFilterOptionsWrapper | undefined) => {
        if (prev) {
          return {
            ...prev,
            data: {
              ...prev.data,
              rules: filteredRules
            }
          }
        }
      })
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="bg-white overflow-x-scroll rounded-sm border border-gray-200 shadow-lg flex justify-between items-start p-4 flex-col md:flex-row">
        {
          <>
            <QueryBuilder
              fields={queryBuilderFields}
              controlClassnames={{
                queryBuilder: "bg-white",
                combinators: "border border-slate-200 py-2",
                addRule: "btn-sm bg-indigo-500 hover:bg-indigo-600 text-white",
                addGroup: "btn-sm bg-indigo-500 hover:bg-indigo-600 text-white mr-4",
                ruleGroup: "ruleGroup",
                removeGroup: "bg-red-500 py-1.5 px-2.5 text-white",
                removeRule: "bg-red-500 py-1.5 px-2.5 text-white",
                rule: "rule",
                fields: "border border-slate-200 py-2",
                operators: "border border-slate-200 py-2",
                value: "mr-10 form-control-sm"
              }}
              controlElements={{
                removeRuleAction: ({ handleOnClick }: any) => {
                  const deleteRuleHandler = (e: React.MouseEvent) => {
                    const targetElement: HTMLElement = e.target as HTMLElement;
                    const ruleId = targetElement.parentElement?.getAttribute("data-rule-id");
                    let isRuleWithoutGroup: IFilterOption | undefined;
                    if (selectedFilter) {
                      isRuleWithoutGroup = selectedFilter.data.rules.find(item => item.hasOwnProperty("field") && item.id === ruleId);
                    }
                    if (ruleId && isRuleWithoutGroup) {
                      deleteRule(ruleId);
                    }
                    handleOnClick(e);
                  }

                  return <Button customClassName="ruleGroup-remove bg-red-500 py-1.5 px-2.5 text-white" clickHandler={deleteRuleHandler}>x</Button>;
                }
              }}
              translations={{
                addRule: {
                  label: "Add rule",
                  title: "Add rule"
                },
                addGroup: {
                  label: "Add group",
                  title: "Add group"
                }
              }}
              query={query}
              onQueryChange={q => setQuery(q)}
            />
            <div className="w-full md:w-auto flex flex-col justify-between">
              <div className="flex md:justify-end mt-4 md:mt-0 md:mb-6">
                <Button size="sm" appearance="primary" customClassName="mr-4" clickHandler={runQueryHandler}>Запустить</Button>
                <Button size="sm" appearance="primary" clickHandler={saveQueryFilterHandler}>Сохранить</Button>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default TableQueryBuilder;
