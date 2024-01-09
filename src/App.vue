<template>
  <v-app>
    <NavBar />
    <v-main id="home">
      <div class="main-container">
        <router-view></router-view>
      </div>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script>
import AppFooter from "./components/Layout/AppFooter.vue";
import NavBar from "./components/Layout/NavBar.vue";

export default {
  name: "App",

  components: {
    AppFooter,
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.main-container {
  min-height: 500px;
  margin-top: 15px;
  width: 100%;
}
</style>
