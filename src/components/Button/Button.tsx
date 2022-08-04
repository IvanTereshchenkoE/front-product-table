import React, { ReactElement } from 'react';

interface IButton {
    children: React.ReactNode,
    clickHandler?: (data: any) => any,
    appearance?: "primary" | "secondary" | "tertiary" | "danger" | "danger_secondary" | "success" | "success_secondary",
    disabled?: boolean,
    loading?: boolean,
    size?: "xs" | "sm" | "normal" | "lg",
    customClassName?: string,
    type?: "button" | "submit" | "reset"
}

const buttonApperanceFactory = (appearance: "primary" | "secondary" | "tertiary" | "danger" | "danger_secondary" | "success" | "success_secondary") => {
    switch (appearance) {
        case "primary": {
            return "btn bg-indigo-500 hover:bg-indigo-600 text-white"
        }
            break;

        case "secondary": {
            return "btn border-gray-200 hover:border-gray-300 text-indigo-500"
        }
            break;

        case "tertiary": {
            return "btn border-gray-200 hover:border-gray-300 text-gray-600"
        }
            break;

        case "danger": {
            return "btn bg-red-500 hover:bg-red-600 text-white"
        }
            break;

        case "danger_secondary": {
            return "btn bg-red-500 hover:bg-red-600 text-white"
        }
            break;

        case "success": {
            return "btn bg-red-500 hover:bg-red-600 text-white"
        }
            break;

        case "success_secondary": {
            return "btn border-gray-200 hover:border-gray-300 text-green-500"
        }
            break;
    }
}

const Button: React.FC<IButton> = ({ children, clickHandler, size, disabled, loading, appearance, customClassName, type }) => {
    return (
        <button
            type={type}
            style={{ outline: "none" }}
            onClick={clickHandler}
            disabled={disabled || loading ? true : false}
            className={` 
            relative
            ${customClassName ? customClassName : ""}
            ${disabled || loading ? "disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed" : ""}
            ${size ? `btn-${size}` : ""} 
            ${appearance ? buttonApperanceFactory(appearance) : ""}
            `
            }
        >
            {
                loading ?
                    <>
                        <svg className="animate-spin w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 16 16"><path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"></path></svg>
                        <span className="ml-2">Loading</span>
                    </>
                    :
                    children
            }
        </button>
    )
}

export default Button