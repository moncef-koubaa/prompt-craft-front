import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";
import authService from "@/services/authService";

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: "history",
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0, left: 0 };
      }
    }
  });

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth) {
        if (!token) {
            return next({ name: 'signin' })
        }

        try {
            await authService.getMe()
            return next()
        } catch (err) {
            authService.logout()
            return next({ name: 'signin' })
        }
    }

    next()
})

export default router;