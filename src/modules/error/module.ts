import { RouteModule } from "src/router/types";
import { ROUTE_NOT_FOUND, ROUTE_PERMISSION_DENIED } from "./types";

const module: RouteModule = {
  routes: [
    {
      path: ROUTE_NOT_FOUND,
      name: ROUTE_NOT_FOUND,
      component: () => import("./pages/NotFound.vue"),
    },
    {
      path: ROUTE_PERMISSION_DENIED,
      name: ROUTE_PERMISSION_DENIED,
      component: () => import("./pages/Fobidden.vue"),
    },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: "/:catchAll(.*)*",
      component: () => import("./pages/NotFound.vue"),
    },
  ],
  configs: {
    [ROUTE_NOT_FOUND]: { isPublic: true },
    [ROUTE_PERMISSION_DENIED]: { isPublic: true },
  },
  navigation: [],
};

export default module;
