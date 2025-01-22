import { endOfMonth, subDays, addMinutes } from "date-fns";
import { date, DateLocale } from "quasar";

import { Config } from "../config";

export const formatDateTime = (
  value: string | number | Date,
  format = Config.dateTimeFormat,
  locale?: DateLocale,
): string => {
  const d = new Date(value);
  if (d === null) {
    return "--";
  }
  return date.formatDate(d, format, locale);
};

export const quasarDateToDateFnsFormat = (quasarFormat: string) => {
  if (!quasarFormat) {
    return quasarFormat;
  }

  let dateFormat = quasarFormat.replace(/D/g, "d");
  dateFormat = dateFormat.replace(/Y/g, "y");

  return dateFormat;
};

export const formatDate = (
  value: string,
  format = Config.dateFormat,
  locale?: DateLocale,
): string => formatDateTime(value, format, locale);

export const formatDateUTC = (value: any, format = Config.dateFormat): string =>
  date.formatDate(addMinutes(value, value.getTimezoneOffset()), format);

export const formatTime = (
  value: string,
  format = "HH:mm",
  locale?: DateLocale,
): string => formatDateTime(value, format, locale);

export const getAge = (value: string): number | null => {
  const d = new Date(value);
  if (!d) {
    return null;
  }

  return new Date().getFullYear() - d.getFullYear();
};

export const formatAge = (
  value: string,
  format: (age: number) => string = (age) => age.toString(),
  emptyText = "--",
): string => {
  const age = getAge(value);
  if (age === null) {
    return emptyText;
  }

  return format(age);
};

export const getDayOfMonth = (month?: number) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth() - (month || 0);
  const firstDay = new Date(y, m, 1);
  const lastDay = subDays(new Date(y, m + (month || 0), 1), 1);
  return { firstDay, lastDay };
};
