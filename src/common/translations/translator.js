import { observe } from 'mobx';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import config from 'common/config';
import appModel from 'models/app';
import resources from './loader';

window.getNewTerms = function getNewTermsWrap() {
  window.dic = window.dic || [];
  let all = '';
  const newLocal = word => {
    all += `\n# Context term \nmsgid "${word}"\nmsgstr "${word}"\n`;
  };
  window.dic.forEach(newLocal);

  console.log(all);
};

// console command to extract into .po file
// all='';dic.forEach(word => {all+=`\nmsgid "${word}"\nmsgstr "${word}"\n`})
function saveMissingKey(key) {
  window.dic = window.dic || [];

  if (window.dic.includes(key)) return;

  if (!`${key}`.trim()) return;

  if (Number.isFinite(parseInt(key, 10))) return;

  console.warn(`🇬🇧: ${key}`);
  window.dic.push(key);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'interface',
    resources,
    lng: config.DEFAULT_LANGUAGE,
    fallbackLng: config.DEFAULT_LANGUAGE,

    keySeparator: false, // we do not use keys in form messages.welcome
    nsSeparator: false, // no namespace use in keys

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    saveMissing: true,
    missingKeyHandler: (_, ns, key) => {
      if (ns === 'interface') {
        saveMissingKey(key);
      }
    },
  });

const newLanguageCodeWrap = ({ newValue }) => {
  if (!newValue) {
    return;
  }

  const newLanguageCode = newValue.replace('_', '-'); // backwards compatible
  i18n.changeLanguage(newLanguageCode);

  document.body.setAttribute('lang', newValue);
};

observe(appModel.data, 'language', newLanguageCodeWrap);
