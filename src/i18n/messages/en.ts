// This is just an example,
// so you can safely delete all default props below

import { ROUTE_HOMEPAGE } from "src/router/routes";
import user from "src/modules/user/i18n/en";
import notification from "src/modules/notification/i18n/en";

export default {
  ...user,
  ...notification,
  route: {
    ...user.route,
    [ROUTE_HOMEPAGE]: "Home",
  },
  label: {
    back_to_home: "Back to home",
    notification: "Notifications",
    language: {
      vi: "Vietnamese",
      en: "English",
    },
  },
  failed: "Action failed",
  success: "Action was successful",
};
