<template>
  <v-app-bar
    app
    absolute
    scroll-target="#home"
    elevate-on-scroll
    dark
    color=primary
  >
    <v-container>
        <h1 class="text-button text-center" style="font-size: 65px;">LUBRICANTES ALONSO</h1>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "HomeBar",

  data() {
    return {
      items: [
        {
          name: "Presentación",
          link: "/presentation",
        },
        {
          name: "Experiencia y educación",
          link: "/experience-education",
        },
        {
          name: "Aptitudes",
          link: "/skills",
        },
        {
          name: "Contacto",
          link: "/contact-me",
        },
      ],
    };
  },
};
</script>

<style scoped>
html {
  overflow: hidden;
}
.text-button {
  font-size: 20px !important;
}
</style>
