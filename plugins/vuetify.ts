import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const customLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#e9eff5',
    surface: '#FFFFFF',
    primary: '#5576fa',
    secondary: '#3490d1',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
      themes: {
        customLight,
      },
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 1,
        darken: 1,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
