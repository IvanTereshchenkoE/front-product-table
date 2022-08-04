import React from 'react';

interface IComponentsLoader {
    size?: number
}

const ComponentsLoader: React.FC<IComponentsLoader> = ({ size }) => {
    return (
        <div className="w-full">
            <div className="text-center py-1">
                <svg style={size ? { height: `${size}px`, width: `${size}px`, display: "inline-block" } : { height: "50px", width: "50px", display: "inline-block" }} className="animate-spin m-0 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle style={{ opacity: "25%" }} cx="12" cy="12" r="10" stroke="#3F51B5" strokeWidth="4"></circle>
                    <path style={{ opacity: "75%" }} fill="#3F51B5"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
    )
};

export default ComponentsLoader;
