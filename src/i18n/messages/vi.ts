// This is just an example,
// so you can safely delete all default props below

import { ROUTE_HOMEPAGE } from "src/router/routes";
import user from "src/modules/user/i18n/vi";
import notification from "src/modules/notification/i18n/vi";

export default {
  ...user,
  ...notification,
  route: {
    ...user.route,
    [ROUTE_HOMEPAGE]: "Trang chủ",
  },
  label: {
    back_to_home: "Về trang chủ",
    notification: "Thông báo",
  },
  failed: "Thất bại",
  success: "Thành công",
};
