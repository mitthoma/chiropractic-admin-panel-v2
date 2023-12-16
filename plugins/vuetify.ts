import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myTheme: ThemeDefinition = {
  colors: {
    primary: "#EAEAEA",
    secondary: "#fff012",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      // themes: {

      // }
      defaultTheme: "dark",
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
