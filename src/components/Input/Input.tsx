import React, { ReactNode } from 'react'

interface IInput {
    changeHandler: (data: any) => any,
    blurHandler?: (data: any) => any,
    value: string,
    placeholder?: string,
    disabled?: boolean,
    label?: string | ReactNode
    name: string,
    customClassName?: string,
    customLabelClassName?: string,
    customLabel?: React.ComponentType
    validationError?: boolean,
    validationErrorDescription?: string,
    require?: boolean,
    id?: string,
    type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"
}

const Input: React.FC<IInput> = (
    {
        changeHandler,
        placeholder,
        disabled = false,
        label,
        name,
        customClassName,
        customLabelClassName,
        customLabel,
        validationError,
        validationErrorDescription,
        value,
        blurHandler,
        require = true,
        id,
        type = "text"
    }
) => {

    return (
        <>
            {customLabel ?
                (
                    <div className="flex">
                        {customLabel}
                        {require && <span className="text-red-500 ml-1">*</span>}
                    </div>
                )
                :
                label &&
                (
                    <>
                        <label
                            className={`block text-gray-600 text-left font-medium mb-1 ${customLabelClassName ? customLabelClassName : ""}`}
                            htmlFor={name}
                        >
                            {label}
                            {require && <span className="text-red-500">*</span>}
                        </label>
                    </>
                )
            }
            <input
                id={id}
                className={`form-input border px-2 py-1 border-slate-200 rounded-md w-full ${customClassName ? customClassName : ""} ${validationError ? "border border-red-500" : ""}`}
                type={type}
                name={name}
                onChange={changeHandler}
                onBlur={blurHandler}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                required={require}
            />
            {
                validationErrorDescription && (
                    <div className="text-xs text-left my-2 text-red-500">
                        {validationErrorDescription}
                    </div>
                )
            }
        </>
    )
}

export default Input