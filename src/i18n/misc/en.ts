import { IntlDateTimeFormats } from "vue-i18n";

export default {
  dateTimeFormats: {
    short: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    },
    shortDate: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    longDate: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "narrow",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
    },
  } as IntlDateTimeFormats,
  numberFormats: {
    currency: {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol",
    },
  },
};
