import { t } from "i18next";
import { Link } from "react-router-dom";

export const MenuWithButton = ({ innerProps, children }) => {
    return (
        <div {...innerProps} className="bg-white">
            <div className="max-h-40 overflow-auto customReactSelectMenu rounded mt-1 relative w-full">
                {children}
            </div>
            <div className="flex justify-center w-full relative my-2">
                <Link to="/seller/new" className="px-5 font-medium flex items-center rounded text-xs p-2 border mb-2 border-gray-200">
                    <svg
                        width="14"
                        className="ml-1 mr-2"
                        height="14"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.5 14.8333V4.19153M4.17912 9.51243L14.8209 9.51243M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z"
                            stroke="black"
                            strokeLinecap="round"
                        />
                    </svg>
                    {t('create_company', { ns: 'messages' })}
                </Link>
            </div>
        </div>
    );
}

