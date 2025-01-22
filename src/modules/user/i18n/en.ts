import {
  ROUTE_USER,
  ROUTE_USER_CREATE,
  ROUTE_USER_DETAIL,
  ROUTE_USER_UPDATE,
} from "../types";

export default {
  route: {
    [ROUTE_USER]: "Account management",
    [ROUTE_USER_CREATE]: "Create account",
    [ROUTE_USER_DETAIL]: "Account detail",
    [ROUTE_USER_UPDATE]: "Update account",
  },
};
