import { extractSubRoute, RouteModule } from "src/router/types";
import { MODULE_USER, ROUTE_USER } from "./types";
import { UserRole } from "src/shared/types";
import { ICON_NAV_ACCOUNT } from "src/shared/themes/types";

const module: RouteModule = {
  routes: [
    {
      path: MODULE_USER,
      redirect: ROUTE_USER,
      component: () => import("../../layouts/MainLayout.vue"),
      children: [
        {
          path: extractSubRoute(ROUTE_USER, MODULE_USER),
          name: ROUTE_USER,
          component: () => import("./pages/Users.vue"),
        },
      ],
    },
  ],
  configs: {
    [ROUTE_USER]: { permissions: [UserRole.Admin] },
  },
  navigation: [
    {
      title: `route.${ROUTE_USER}`,
      icon: ICON_NAV_ACCOUNT,
      pathName: ROUTE_USER,
      permissions: [UserRole.Admin],
      subMenus: [
        {
          title: `route.${ROUTE_USER}`,
          pathName: ROUTE_USER,
          permissions: [UserRole.Admin],
        },
        {
          title: `route.${"hello"}`,
          pathName: "hello",
          permissions: [UserRole.Admin],
        },
        {
          title: `route.${"hi"}`,
          pathName: "hi",
          permissions: [UserRole.Admin],
        },
      ],
    },
  ],
};

export default module;
