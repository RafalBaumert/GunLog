import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../pages/LandingPage.vue';
import Dashboard from '../pages/Dashboard.vue';
import NewGun from '../pages/NewGun.vue';
import GunLog from '../pages/GunLog.vue';
import EditGun from '../components/EditGun';
import store from '../store/index.js'; // Dodane na potrzeby router navigation guards beforeEach()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: LandingPage, meta: { requiresUnauth: true } },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/addgun', component: NewGun },
    { path: '/gunlog', component: GunLog },
    // { path: '/edit', component: EditGun, meta: { requiresAuth: true } },
    { path: '/edit', component: EditGun },
  ],
});

// Navigation routes
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // Jeśli wymaga zalogowania a nie jesteśmy
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    // Jeśli nie powinniśmy być zalogowani a jesteśmy
    next('/');
    // next();
  } else {
    next();
  }
});

export default router;
