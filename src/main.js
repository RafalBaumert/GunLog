import { createApp } from 'vue';
import App from './App.vue';
import './styles/global.css';
import router from './router/router.js';
import store from './store/index.js';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/vela-green/theme.css';
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);
