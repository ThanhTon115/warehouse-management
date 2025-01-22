import { RouteRecordRaw } from "vue-router";

import * as sharedTypes from "../shared/types";

export type RouteConfig = {
  isPublic?: boolean;
  permissions?: sharedTypes.AppPermission[];
  moduleId?: string;
};

export type NavigationItem = {
  title: string;
  pathName?: string;
  to?: string;
  key?: string;
  icon?: string;
  activeIcon?: string;
  permissions?: sharedTypes.AppPermission[];
  subMenus?: NavigationItem[];
  moduleId?: string;
  priority?: number;
  platforms?: sharedTypes.PLATFORM[];
};

export type RouteModule = {
  routes: RouteRecordRaw[];
  configs: Record<string, RouteConfig>;
  navigation: NavigationItem[];
};

export const createRouteModule = (): RouteModule => ({
  routes: [],
  configs: {},
  navigation: [],
});

export const extractSubRoute = (routeName: string, prefix: string): string =>
  routeName.replace(`/${prefix}/`, "");

export const composeModules = (...modules: RouteModule[]): RouteModule =>
  (modules || []).reduce(
    (acc, md) => ({
      routes: [...acc.routes, ...md.routes],
      configs: {
        ...acc.configs,
        ...md.configs,
      },
      navigation: [...acc.navigation, ...md.navigation],
    }),
    {
      routes: [],
      configs: {},
      navigation: [],
    },
  );
