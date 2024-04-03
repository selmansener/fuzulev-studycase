import { store } from './store/store';
import { Auth0Provider } from '@auth0/auth0-react';
import { config } from './config';
import { Provider } from 'react-redux';
import { Router } from './router/router';
import { routes } from './router/routes';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import { Authenticated } from './pages/auth/Authenticated';
import { Unauthenticated } from './pages/auth/Unauthenticated';
import { HelmetProvider } from "react-helmet-async";

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    detection: {
      order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'querystring', 'htmlTag', 'path', 'subdomain']
    },
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Auth0Provider
          domain={config.authConfig.domain}
          clientId={config.authConfig.clientId}
          useRefreshTokens={true}
          useRefreshTokensFallback={true}
          cacheLocation="localstorage"
          authorizationParams={{
            redirect_uri: config.authConfig.redirectUri,
            audience: config.authConfig.audience,
            scope: config.authConfig.scopes.join(" "),
            ui_locales: "tr en-GB"
          }}

        >
          <HelmetProvider>
            <Authenticated>
              <Router routes={routes} isPublic={false} currentAccountRole="user" environment={config.environment} />
            </Authenticated>
            <Unauthenticated>
              <Router routes={routes} isPublic={true} currentAccountRole="user" environment={config.environment} />
            </Unauthenticated>
          </HelmetProvider>
        </Auth0Provider>
      </Provider>
    </div>
  );
}

export default App;
