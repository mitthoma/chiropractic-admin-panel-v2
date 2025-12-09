import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const customLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f8fafc',
    surface: '#FFFFFF',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    error: '#ef4444',
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    'primary-darken-1': '#0284c7',
    'surface-variant': '#f1f5f9',
    'on-surface-variant': '#64748b',
  },
};

const customDark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0f172a', // Dark slate
    surface: '#1e293b', // Slate 800
    'surface-bright': '#334155', // Slate 700
    'surface-variant': '#334155',
    'on-surface-variant': '#94a3b8',
    primary: '#38bdf8', // Sky 400 (brighter for dark mode)
    'primary-darken-1': '#0ea5e9',
    secondary: '#22d3ee', // Cyan 400
    error: '#f87171',
    info: '#60a5fa',
    success: '#34d399',
    warning: '#fbbf24',
    'on-background': '#f1f5f9',
    'on-surface': '#f1f5f9',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'customLight',
      themes: {
        customLight,
        customDark,
      },
      variations: {
        colors: ['primary', 'secondary', 'surface'],
        lighten: 1,
        darken: 1,
      },
    },
    defaults: {
      VBtn: {
        style: [{ textTransform: 'none' }],
      },
      VCard: {
        elevation: 2,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
