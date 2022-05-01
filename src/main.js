import { createApp } from 'vue';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toastification/dist/index.css';
import i18n from './langs/i18n';

const app = createApp(App, {
  logError: true,
});

Sentry.init({
  app,
  dsn: 'https://38d93a84ac4747b2bb4bdd890f1213d0@o243035.ingest.sentry.io/6373079',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'metacourse.oton.technology', /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
app.use(i18n).use(store).use(Toast, {}).use(router);

app.config.globalProperties = {
  ...app.config.globalProperties,
  $d: function $date(date, type) {
    const $d = i18n.global.d;
    if (typeof date === 'number') {
      return $d(date, type);
    }

    if (typeof date === 'string') {
      return $d(new Date(date), type);
    }

    console.error('Invalid Date');
    return 'Invalid Date';
  },
  $t: function $t(a, b, c) {
    return i18n.global.t(a, b, c);
  },
};

app.mount('#app');
