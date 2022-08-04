import React from "react";

import trashBin from "assets/images/trashBin.svg";
import { Button } from "components";

interface IDefaultColumnFilterProps {
    column: {
        filterValue: string,
        preFilteredRows: Array<object>,
        setFilter: (str: string | undefined) => void
    }
}

const DefaultColumnFilter: React.FC<IDefaultColumnFilterProps> = ({
    column: { filterValue, preFilteredRows, setFilter },
}) => {

    return (
        <div className='flex justify-center'>
            <input
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
                style={{ maxWidth: "90%" }}
                className='border px-2 py-1 border-slate-200 rounded-md'
                placeholder={`Поиск совпадений`}
            />
            <Button customClassName='ml-2' clickHandler={() => setFilter(undefined)}>
                <img src={trashBin} alt="delete" />
            </Button>
        </div>

    )
}

export default DefaultColumnFilter;