import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  'sw-KE': 'Swahili',
  sw: { default: 'sw-KE' },
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    // demo-only languages
  });
}

export default languages;
