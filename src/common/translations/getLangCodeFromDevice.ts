import { Device } from '@capacitor/device';

// type for language entries that can be either a string or object with default property
type LanguageEntry = string | { default: string };

// type for the languages parameter - an object with language codes as keys
type Languages = Record<string, LanguageEntry>;

const getLangCodeFromDevice = async (languages: Languages): Promise<string> => {
  const deviceISOkey = await Device.getLanguageCode();
  // const deviceISOkey = { value: 'pt' };

  // iterate through language entries to find matching device language
  // eslint-disable-next-line no-restricted-syntax
  for (const [languageISOKey, languageOptionsOrLabel] of Object.entries(
    languages
  )) {
    if (languageISOKey === deviceISOkey.value) {
      // return default property if it exists, otherwise return the key
      return typeof languageOptionsOrLabel === 'object'
        ? languageOptionsOrLabel.default
        : languageISOKey;
    }
  }

  return '';
};

export default getLangCodeFromDevice;
