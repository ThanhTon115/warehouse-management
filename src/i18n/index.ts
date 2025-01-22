import { createI18n, I18n } from "vue-i18n";
import enMessages from "./messages/en";
import viMessages from "./messages/vi";

import formatEn from "./misc/en";
import formatVi from "./misc/vi";
import { Config } from "src/shared/config";
import { getAppLocale } from "src/shared/storage";
export type I18nDateTimeFormat = keyof typeof formatEn.dateTimeFormats;
export const LANGUAGES = ["en", "vi"];

export default (): I18n<any, any, any, false> => {
  const messages = {
    en: enMessages,
    vi: viMessages,
  };

  const dateTimeFormats = {
    en: formatEn.dateTimeFormats,
    vi: formatVi.dateTimeFormats,
  };

  const numberFormats = {
    en: formatEn.numberFormats,
    vi: formatVi.numberFormats,
  };

  const supportedLanguages = Object.keys(messages);
  let currentLocale = Config.locale;
  if (!process.env.SERVER) {
    const xLocale = getAppLocale();
    currentLocale =
      xLocale && supportedLanguages.includes(xLocale) ? xLocale : Config.locale;
  }

  return createI18n({
    legacy: false,
    messages, // set locale messages
    numberFormats,
    datetimeFormats: dateTimeFormats,
    locale: currentLocale, // set locale
  });
};
