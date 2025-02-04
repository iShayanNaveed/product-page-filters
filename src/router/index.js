import Vue from "vue";
import VueRouter from "vue-router";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const auth = getAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        next({ name: "login" });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
