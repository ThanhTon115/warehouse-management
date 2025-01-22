import { Config } from "./config";

const AppLocale = `${Config.appName}-locale`;

export const getAppLocale = (): string | null =>
  localStorage.getItem(AppLocale);

export const setAppLocale = (locale: string): void => {
  localStorage.setItem(AppLocale, locale);
};
