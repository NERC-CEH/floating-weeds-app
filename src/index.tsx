import { configure as mobxConfig } from 'mobx';
import i18n from 'i18next';
import 'jeep-sqlite';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { App as AppPlugin } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { sentryOptions } from '@flumens';
import { setupIonicReact, isPlatform } from '@ionic/react';
import * as Sentry from '@sentry/browser';
import config from 'common/config';
import languages from 'common/languages';
import { db } from 'common/models/store';
import getLangCodeFromDevice from 'common/translations/getLangCodeFromDevice';
import appModel from 'models/app';
import samples from 'models/collections/samples';
import userModel from 'models/user';
import App from './App';

console.log('🚩 App starting.'); // eslint-disable-line

i18n.use(initReactI18next).init({ lng: 'en' });

mobxConfig({ enforceActions: 'never' });
setupIonicReact();

async function init() {
  await db.init();
  await userModel.fetch();
  await appModel.fetch();
  await samples.fetch();

  if (!appModel.data.language) {
    const langCode = (await getLangCodeFromDevice(languages)) || 'en';
    console.log(`Setting app language to: ${langCode}`);
    appModel.data.language = langCode;
    appModel.save();
  }

  appModel.data.sendAnalytics &&
    Sentry.init({
      ...sentryOptions,
      dsn: config.sentryDSN,
      environment: config.environment,
      release: config.version,
      dist: config.build,
      initialScope: {
        user: { id: userModel.id },
        tags: { session: appModel.data.appSession },
      },
    });

  appModel.data.appSession += 1;

  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);

  if (isPlatform('hybrid')) {
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });

    SplashScreen.hide();

    AppPlugin.addListener('backButton', () => {
      /* disable android app exit using back button */
    });
  }
}

init();
