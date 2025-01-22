import type {
  LocationAsRelativeRaw,
  RouteLocationOptions,
  RouteLocationRaw,
  RouteQueryAndHash,
  RouteRecord,
  RouteRecordRaw,
} from "vue-router";
import * as types from "./types";
import errorModule from "src/modules/error/module";
import userModule from "src/modules/user/module";
import { ICON_HOME, ICON_NAV_HOME } from "src/shared/themes/types";

export const ROUTE_HOMEPAGE = "/homepage";
export const modules: types.RouteModule = types.composeModules(
  {
    routes: [
      {
        path: "/",
        redirect: ROUTE_HOMEPAGE,
        component: () => import("layouts/MainLayout.vue"),
        children: [
          {
            path: ROUTE_HOMEPAGE,
            name: ROUTE_HOMEPAGE,
            component: () => import("../components/HomePage.vue"),
          },
        ],
      },
    ],
    configs: {
      [ROUTE_HOMEPAGE]: {
        permissions: [],
        moduleId: "homepage",
      },
    },
    navigation: [
      {
        title: `route.${ROUTE_HOMEPAGE}`,
        icon: ICON_NAV_HOME,
        pathName: ROUTE_HOMEPAGE,
        moduleId: "homepage",
      },
    ],
  },
  errorModule,
  userModule,
);

export const publicRoutes = [
  ...Object.keys(modules.configs).filter(
    (k) =>
      modules?.configs && modules?.configs[k] && modules?.configs[k].isPublic,
  ),
];

export const findBreadcrumbs = (
  route: RouteLocationRaw,
): Array<RouteQueryAndHash & LocationAsRelativeRaw & RouteLocationOptions> => {
  const findRoute = (node: any): any[] => {
    if (node.name === (route as Record<string, any>).name) {
      return [
        {
          name: node.name,
          props: node.props,
          parents: node.parents,
        },
      ];
    }
    if (!node.children?.length) {
      return [];
    }

    let children = [];
    for (const child of node.children) {
      children = findRoute(child);
      if (children.length) {
        break;
      }
    }

    return children?.length
      ? [
          {
            name: node.name,
            params: (node as RouteRecord).props
              ? children[0].params
              : undefined,
          },
          ...children,
        ]
      : [];
  };

  const results = (() => {
    for (const root of modules.routes) {
      if (!root.children?.length) {
        continue;
      }

      for (const child of root.children) {
        const r = findRoute(child);
        if (r.length) {
          return r;
        }
      }
    }
    return [];
  })();

  if (!results.length) {
    return [route as unknown as any];
  }
  if (results.length == 1 && results[0].parents?.length) {
    return [...results[0].parents, route];
  }

  return results.slice(0, results.length - 1).concat([route]);
};

export default modules;
