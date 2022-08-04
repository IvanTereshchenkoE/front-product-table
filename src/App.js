import { useEffect } from 'react';
import { createServer } from "miragejs";

import {apiMockConfig} from "server/server";
import AllRoutes from "Routes/AllRoutes";

export const server = createServer(apiMockConfig);

function App() {

  // useEffect(() => {
  //   if(window.location.pathname !== "/tableShipments") {
  //     window.location.pathname = "/tableShipments";
  //   }
  // }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;