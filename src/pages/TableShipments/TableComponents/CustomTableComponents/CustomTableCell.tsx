import React, { MutableRefObject } from 'react';

import pencilChange from "assets/images/pencilChange.svg";
import applyIcon from "assets/images/applyIcon.svg";

import { Button } from "components";

interface ICustomTableProps {
    value: string,
    row: any,
    column: {
        id: string,
        Header: string
    },
    updateProduct: (index: number, id: string, value: string) => void
}

const CustomTableCell: React.FC<ICustomTableProps> = ({
    value: initialValue,
    row,
    row: { index },
    column,
    column: { id },
    updateProduct,
}) => {
    const cellInput: MutableRefObject<HTMLInputElement | null> = React.useRef(null);

    const [value, setValue] = React.useState(initialValue);
    const [newValue, setNewValue] = React.useState<string>("");
    const [isChanging, setIsChanging] = React.useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setNewValue(e.target.value)
    }

    const blurHandler = () => {
        setIsChanging(false);
        if (newValue === value) {
            updateProduct(index, column.Header, newValue);
        }
    }

    const saveChangedProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsChanging(false);
        if (newValue === value) {
            updateProduct(index, column.Header, newValue);
        }
    }

    const startChanging = () => {
        setIsChanging(true);
    }

    React.useEffect(() => {
        if (cellInput.current) {
            if (isChanging) {
                cellInput.current.focus();
            } else {
                cellInput.current.blur();
            }
        }
    }, [isChanging, cellInput])

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue])

    return (
        <div className="group flex items-center justify-between relative h-6 min-h-full">
            <input disabled={!isChanging} ref={cellInput} className="bg-transparent mr-px w-48 max-w-full truncate overflow-hidden " value={value || ""} onFocus={startChanging} onChange={changeHandler} onBlur={blurHandler} />
            <div className="flex items-center absolute right-2 transition-opacity opacity-0 group-hover:opacity-100 ">
                <Button clickHandler={() => setIsChanging(!isChanging)} customClassName="text-black bg-white mr-2">
                    <img className="w-4" src={pencilChange} alt="change" />
                </Button>
                {
                    isChanging &&
                    <Button clickHandler={saveChangedProduct}>
                        <img className="w-4" src={applyIcon} alt="apply" />
                    </Button>
                }
            </div>
        </div>
    )
}

export default CustomTableCell;
