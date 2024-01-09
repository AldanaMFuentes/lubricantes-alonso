import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/Views/HomePage.vue";
import NotFound from "./components/Nav/NotFound.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: HomePage,
      name: "Home",
    },
    // {
    //   path: "/presentation",
    //   component: MyPresentation,
    // },
    // {
    //   path: "/experience-education",
    //   component: ExperienceEducation,
    // },
    // {
    //   path: "/skills",
    //   component: MySkills,
    // },
    // {
    //   path: "/contact-me",
    //   component: ContactMe,
    // },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});

export default router;
