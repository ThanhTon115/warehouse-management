import { PropType, StyleValue } from "vue";
import {
  ionChevronBack,
  ionChevronDown,
  ionChevronForward,
  ionChevronUp,
  ionCloseOutline,
  ionHomeOutline,
  ionNotificationsOutline,
} from "@quasar/extras/ionicons-v6";
export const ForbiddenImage = "/img/forbidden.svg";
export const NotFoundImage = "/img/not_found.svg";
export const Logo = "/img/logo.svg";
export type ThemeState = {
  dark: boolean;
  meta: {
    title: string;
    description: string;
  };
  logo: {
    default: string;
    compact?: string;
  };
  colors: {
    primary: string;
    primaryBold: string;
    secondary: string;
    accent: string;
    dark: string;
    "dark-page": string;
    positive: string;
    negative: string;
    info: string;
    warning: string;
    light: string;
    "light-page": string;
  };
  textColors: {
    dark: string;
    "dark-field": string;
    "dark-label": string;
    light: string;
    "light-field": string;
    "light-label": string;
  };
  font: {
    size: number;
  };
};

export type ClassProp = string | Record<string, boolean> | ClassProp[];

export type StyleProps = {
  class?: ClassProp;
  style?: StyleValue;
};

export const ICON_FORWARD = ionChevronForward;
export const ICON_BACK = ionChevronBack;
export const ICON_UP = ionChevronUp;
export const ICON_DOWN = ionChevronDown;
export const ICON_HOME = ionHomeOutline;
export const ICON_NOTIFICATION = ionNotificationsOutline;
export const ICON_CLOSE = ionCloseOutline;
export const ICON_NAV_HOME = "svguse:/icons.svg#nav-home";
export const ICON_NAV_ACCOUNT = "svguse:/icons.svg#nav-account-management";
export const ICON_MAIL = "svguse:/icons.svg#icon-notification";
export const ICON_READ_NOTIFICATION =
  "svguse:/icons.svg#icon-read-notification";
export const ICON_UNREAD_NOTIFICATION =
  "svguse:/icons.svg#icon-unread-notification";
export const ICON_SUN = "/img/sun.svg";
export const ICON_MOON = "/img/moon.svg";
export const ICON_STAR_SKY = "/img/star-sky.svg";
export const ICON_CLOUD = "/img/cloud.svg";
