import React from 'react';
import { Route, Routes,  } from "react-router-dom";

import {
    TableWrapper
} from "pages";
import TableShipments from 'pages/TableShipments/TableWrapper';
import TestPage from 'pages/Testpage';

const AllRoutes: React.FC<any> = () => {
    return (
        <>
                <Routes>
                    <Route path="/table" element={<TableWrapper />} />
                    <Route path="/tableShipments" element={<TableShipments />} />
                    <Route path="/tableShipments123" element={<TestPage/>} />
                </Routes>
        </>
    )
}

export default AllRoutes;