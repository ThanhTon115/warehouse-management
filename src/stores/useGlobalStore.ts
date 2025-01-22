import { defineStore } from "pinia";
import { Config } from "src/shared/config";
import { getDefaultTheme } from "src/shared/themes/theme";
import { ThemeState } from "src/shared/themes/types";

export const LOCAL_STORAGE_PROFILE_CACHE = "localstorage_profile_cache";
export const LOCAL_STORAGE_LEFT_DRAWER_MINI = "local_storage_left_drawer_mini";
export const LOCAL_STORAGE_USER_BEHAVIOR = "local_storage_user_behavior";
export const LOCAL_STORAGE_THEME = "local_storage_theme";

type GlobalState = {
  loading: boolean;
  loadingBar: boolean;
  currentLocale: string;
  // account: Me | null;
  leftDrawerVisible: boolean;
  leftDrawerMini: boolean;
  genders: string[];
  theme: ThemeState;
  imageCache: Record<string, string>;
  // profileCache: Record<string, Me>;
  profileSwitching: any;
  currentBranches: string[];
  userBehavior?: Record<string, any>;
  userTaskStatusOrder?: Record<string, any>;
};
export default defineStore("global", {
  state: (): GlobalState => {
    const leftDrawerMini =
      localStorage.getItem(LOCAL_STORAGE_LEFT_DRAWER_MINI) || "false";
    const userBehavior = localStorage.getItem(LOCAL_STORAGE_USER_BEHAVIOR);
    const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME);
    return {
      loading: false,
      loadingBar: false,
      //   account: null,
      leftDrawerVisible: true,
      leftDrawerMini: leftDrawerMini === "true",
      currentLocale: Config.locale,
      genders: ["male", "female"],
      theme: getDefaultTheme({ dark: defaultTheme === "true" }),
      imageCache: {},
      //   profileCache: profileCache ? JSON.parse(profileCache) : {},
      profileSwitching: null,
      currentBranches: [],
      userBehavior: userBehavior ? JSON.parse(userBehavior) : null,
    };
  },
  getters: {
    // isAuthenticated: (state) => {
    //   return !!state.account?.id;
    // },
    homeUrl: () => {
      return "/";
    },
    // hasPermissions: (state) => {
    //   return (names: string[]) => {
    //     return (
    //       state.account?.role === ROLE_MODERATOR ||
    //       (state.account?.roles?.length &&
    //         names.includes(state.account.roles[0].role_id))
    //     );
    //   };
    // },
    // getProfileCaches: (state) => {
    //   return Object.values(state.profileCache)?.filter(
    //     (e) => e.id !== state.account?.id
    //   );
    // },
  },
  actions: {
    authenticate(account: any) {
      // this.account = account;
      this.currentBranches = [];
      // this.profileCache = {
      //   ...this.profileCache,
      //   [account.id]: account,
      // };
      // localStorage.setItem(
      //   LOCAL_STORAGE_PROFILE_CACHE,
      //   JSON.stringify(this.profileCache),
      // );
    },
    setLeftDrawerMini(payload: boolean) {
      localStorage.setItem(LOCAL_STORAGE_LEFT_DRAWER_MINI, `${payload}`);
      this.leftDrawerMini = payload;
    },
    updateUserBehavior(route: string, changes: Record<string, any>) {
      this.userBehavior = { ...this.userBehavior, [route]: changes };
      localStorage.setItem(
        LOCAL_STORAGE_USER_BEHAVIOR,
        JSON.stringify(this.userBehavior),
      );
    },
    clearUserBehavior() {
      this.userBehavior = {};
      localStorage.setItem(LOCAL_STORAGE_USER_BEHAVIOR, "{}");
    },
    changeTheme() {
      this.$state.theme.dark = !this.$state.theme.dark;
      localStorage.setItem(
        LOCAL_STORAGE_THEME,
        this.$state.theme.dark ? "true" : "false",
      );
    },
  },
});
