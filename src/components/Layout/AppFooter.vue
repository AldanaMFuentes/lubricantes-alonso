<template>
  <v-footer dark padless>
    <v-card flat tile class="white--text" color="primary">
      <v-row class="pb-2 pt-4 mb-0">
        <v-col :cols="isMobile ? 12 : 3" :lg="3" :md="3" :sm="6" :xs="12" class="ml-5 pr-0" :style="{ 'padding-left': isMobile ? '50px' : '20px' }">
          <v-card-text class="pa-0">
            Lubricantes Alonso <br />
            Distriubuidora Oficial Córdoba
          </v-card-text>
        </v-col>
        <v-col cols="1" class="text-right pr-0 ml-5" :style="{ 'padding-left': isMobile ? '45px' : '0' }">
          <v-icon size="24px">mdi-map-marker</v-icon>
        </v-col>
        <v-col :cols="isMobile ? 10 : 3" :lg="3" :md="3" :sm="4" :xs="10" class="pr-0" :style="{ 'padding-left': isMobile ? '40px' : '0' }">
          <v-card-text class="pa-0">
            Las toscas S/N <br />
            Villa Esquiú Córdoba Argentina
          </v-card-text>
        </v-col>
        <v-col :cols="isMobile ? 12 : 4" :lg="4" :md="4" :sm="12" :xs="12" :style="{ 'padding-right': isMobile ? '90px' : '0' }">
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
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
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
