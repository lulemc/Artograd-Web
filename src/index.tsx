import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/promo/styles.css';
import './index.module.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import {
  HistoryAdaptedRouter,
  useUuiServices,
  UuiContext,
} from '@epam/uui-core';
import { ErrorHandler } from '@epam/promo';
import { svc } from './services';

import { MainPage } from './pages/MainPage';
import { TendersPage } from './pages/TendersPage';
import TenderPage from './pages/TenderPage';
import Layout from './pages/Layout';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);

function UuiEnhancedApp() {
  const { services } = useUuiServices({ router });
  Object.assign(svc, services);
  return (
    <UuiContext.Provider value={services}>
      <ErrorHandler>
        <Router history={history}>
          <Layout>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/tenders" component={TendersPage} />
              <Route path="/object/:tenderId" component={TenderPage} />
            </Switch>
          </Layout>
        </Router>
      </ErrorHandler>
    </UuiContext.Provider>
  );
}

function initApp() {
  const root = createRoot(window.document.getElementById('root') as Element);
  root.render(
    <StrictMode>
      <UuiEnhancedApp />
    </StrictMode>,
  );
}

initApp();
