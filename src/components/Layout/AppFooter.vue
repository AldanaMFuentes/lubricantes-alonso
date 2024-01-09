<template>
  <v-footer dark padless>
    <v-card flat tile class="white--text" color="primary">
      <v-row class="pb-2 pt-4 mb-0">
        <v-col cols="3" class="ml-5 pl-5 pr-0">
          <v-card-text class="pa-0">
            Lubricantes Alonso ® S.A <br />
            Distriubuidora Oficial Córdoba
          </v-card-text>
        </v-col>
        <v-col cols="1" class="text-right pr-0">
          <v-icon size="24px">mdi-map-marker</v-icon>
        </v-col>
        <v-col cols="3" class="pr-0">
          <!-- dirección de prueba CAMBIAR -->
          <v-card-text class="pa-0">
            Dr. Ignacio Arieta 5597 (1766) <br />
            La Tablada Buenos Aires Argentina
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <v-row v-for="socialMedia in socialMedias" :key="socialMedia.name">
            <v-col class="text-right pa-0">
              <v-btn class="white--text" icon>
                <a :href="socialMedia.link" target="_blank">
                  <v-icon size="24px" class="white--text"  >
                    {{ socialMedia.icon }}
                  </v-icon>
                </a>
              </v-btn>
            </v-col>
            <v-col class="pl-0 pb-0 pt-2">
              <v-card-text class="pa-0">
                <a :href="socialMedia.link" target="_blank" class="white--text" style="text-decoration: none;">
                    {{ socialMedia.user }}
                </a>
              </v-card-text>
            </v-col></v-row
          >
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",

  data() {
    return {
      socialMedias: [
        {
          name: "Gmail",
          link: "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=lubricanteslostelares@gmail.com",
          icon: "mdi-email-outline",
          user: "lubricanteslostelares@gmail.com"
        },
        {
          name: "Instagram",
          link: "https://www.instagram.com/lubricantes.alonso/",
          icon: "mdi-instagram",
          user: "lubricantes.alonso"
        },
      ],
    };
  },
  methods: {
  }
};
</script>

<style>
.white--text {
  width: 100%;
}
</style>
