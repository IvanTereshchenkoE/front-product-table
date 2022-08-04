import React from 'react';
import ReactPaginate from 'react-paginate';
import { SetStateAction } from "react";

import type { ITableSettings } from "../TableWrapper"

interface IPaginatorProps {
    pageSize: number,
    totalProducts: number,
    setTableSettings: (data: SetStateAction<ITableSettings>) => void,
    tableSettings: ITableSettings,
}

interface ISelectedPaginate {
    selected: number
}

const Paginator: React.FC<IPaginatorProps> = ({ pageSize, totalProducts, setTableSettings, tableSettings }) => {
    const [pageCount, setPageCount] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState<number>(tableSettings.page - 1);

    React.useEffect(() => {
        setPageCount(Math.ceil(totalProducts / pageSize));
    }, [pageSize, totalProducts]);

    React.useEffect(() => {
        if(pageCount !== 0 && pageCount <= currentPage) {
            handlePageClick({selected: pageCount - 1})
        }
    }, [currentPage, pageCount])

    const handlePageClick = (data: ISelectedPaginate) => {
        setCurrentPage(data.selected);
        setTableSettings((prev) => {
            return {
                ...prev,
                page: data.selected + 1
            }
        });
    };

    return (
        <div className="mt-4" >
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <>
                        <span className="sr-only">Next</span><wbr />
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                            <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                        </svg>
                    </>
                }
                forcePage={currentPage}
                onPageChange={handlePageClick}
                containerClassName={'flex paginator'}
                pageClassName={'inline-flex items-center justify-center leading-5 px-3 py-2 bg-white hover:bg-indigo-500 border border-gray-200 text-gray-600 hover:text-white'}
                breakLinkClassName={'inline-flex items-center justify-center leading-5 px-3 py-2 bg-white border border-gray-200 text-gray-400'}
                nextLinkClassName={'inline-flex items-center justify-center rounded leading-5 ml-3 px-3 py-2 bg-white hover:bg-indigo-500 border border-gray-200 text-gray-600 hover:text-white shadow-sm'}
                previousLinkClassName={'inline-flex items-center justify-center rounded leading-5 mr-3 px-3 py-2 bg-white hover:bg-indigo-500 border border-gray-200 text-gray-600 hover:text-white shadow-sm'}
                activeClassName={'inline-flex items-center justify-center rounded-l leading-5 bg-white border border-gray-200 text-indigo-500'}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel={
                    <>
                        <span className="sr-only">Previous</span><wbr />
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                            <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
                        </svg>
                    </>
                }
            />
        </div>
    );
}

export default Paginator;