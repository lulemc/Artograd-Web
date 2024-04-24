import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/css/theme/theme_electric.css';
import './index.module.scss';
import { ReactNode, StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import {
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import {
  HistoryAdaptedRouter,
  useUuiServices,
  UuiContext,
} from '@epam/uui-core';
import { ErrorHandler } from '@epam/promo';
import { svc } from './services';
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from './layout/Layout';
import './i18n';
import { ErrorPage } from './pages/NotFoundPage/NotFoundPage';
import { CallbackPage } from './pages/Callback/Callback';
import { RootState, store } from './store/store';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { TendersPage } from './pages/TendersPage/TendersPage';
import { NewTenderPage } from './pages/NewTenderPage/NewTenderPage';
import { Modals, Snackbar } from '@epam/uui-components';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { overrideUUILocalisation } from './translation/i18nUUI';
import { useTranslation } from 'react-i18next';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);
const persistor = persistStore(store);

const OfficerRoutes = ({ children }: { children: ReactNode }) => {
  const history = useHistory();
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');
  return <>{isOfficer ? children : history.push('/')}</>;
};
const ProfileRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.identity);
  const history = useHistory();
  return <>{isLoggedIn ? children : history.push('/')}</>;
};

const CommonRedirectRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.identity);
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');
  const isArtist = userRoles?.includes('Artists');
  const { given_name, family_name, phone_number } = useSelector(
    (state: RootState) => state.identity.userData,
  );
  const company = useSelector(
    (state: RootState) => state.identity.userData['custom:organization'],
  );
  const jobtitle = useSelector(
    (state: RootState) => state.identity.userData['custom:jobtitle'],
  );
  // Redirect to profile if there are no required fields(first name, second name, company(for officer only), phone_number(for artist only)
  const artistRedirect =
    isArtist && !(!!given_name && !!family_name && !!phone_number);
  const officerRedirect =
    isOfficer && !(!!given_name && !!family_name && !!company && !!jobtitle);
  const userRedirect =
    !isArtist && !isOfficer && !(!!given_name && !!family_name);

  const redirect =
    isLoggedIn && (artistRedirect || officerRedirect || userRedirect);

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const pathName = location.pathname;
    if (redirect && pathName !== '/profile') {
      history.replace('/profile');
    }
  }, [history, location]);
  return <></>;
};

const UuiEnhancedApp = () => {
  const { services } = useUuiServices({ router });
  const { t } = useTranslation();
  Object.assign(svc, services);
  overrideUUILocalisation(t);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UuiContext.Provider value={services}>
          <ErrorHandler>
            <Router history={history}>
              <Layout>
                <CommonRedirectRoute></CommonRedirectRoute>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/callback" component={CallbackPage} />
                  <Route exact path="/tenders" component={TendersPage} />
                  <ProfileRoute>
                    <Route exact path="/profile" component={ProfilePage} />
                  </ProfileRoute>
                  <OfficerRoutes>
                    <Route
                      exact
                      path="/tenders/new"
                      component={NewTenderPage}
                    />
                  </OfficerRoutes>
                  <Route path="*" component={ErrorPage} />
                </Switch>
              </Layout>
            </Router>
            <Snackbar />
            <Modals />
          </ErrorHandler>
        </UuiContext.Provider>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const root = createRoot(window.document.getElementById('root') as Element);
  root.render(
    <StrictMode>
      <UuiEnhancedApp />
    </StrictMode>,
  );
};

App();
