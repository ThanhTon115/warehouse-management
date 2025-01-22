import { defineBoot } from "#q-app/wrappers";
import i18n from "src/i18n";

export default defineBoot(({ app }) => {
  const i18nInstance = i18n();
  // Set i18n instance on app
  app.use(i18nInstance as any);
});
