import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import './i18n';
import 'assets/css/style.scss';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
