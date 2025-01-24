import useGlobalStore, {
  LOCAL_STORAGE_LOCALE,
} from "src/stores/useGlobalStore";

export const getAppLocale = (): string | null =>
  localStorage.getItem(LOCAL_STORAGE_LOCALE);

export const setAppLocale = (locale: string): void => {
  useGlobalStore().setLocale(locale);
  localStorage.setItem(LOCAL_STORAGE_LOCALE, locale);
};
