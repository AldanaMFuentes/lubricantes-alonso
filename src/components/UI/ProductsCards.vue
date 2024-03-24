<template>
  <v-col :cols="isMobile ? 12 : 4" :lg="4" :md="4" :sm="6" :xs="12">
    <v-card
      class="product-card"
      :style="{ minHeight: cardHeight, minWidth: cardWidth }"
    >
      <div class="image-container">
        <v-img
          :src="imageData"
          alt="Product Image"
          :height="imageHeight"
          :width="imageWidth"
        >
        </v-img>
      </div>
      <v-card-title
        class="text-button pb-4"
        min-height="56px"
        style="line-height: 15px"
      >
        {{ denominacion }}
      </v-card-title>
      <v-card-subtitle
        class="text-button pb-0 pt-1"
        style="font-size: 12px !important; line-height: 20px"
      >
        Precio: ${{ formatPrice(precio) }}
      </v-card-subtitle>
      <v-card-subtitle
        class="text-button pb-0 pt-0"
        style="font-size: 12px !important; line-height: 20px"
        :class="{ 'disponible': stock > 0, 'no-disponible': stock <= 0 }"
      >
        {{ stock > 0 ? "DISPONIBLE" : "NO DISPONIBLE" }}
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ProductsCards",
  props: {
    denominacion: {
      type: String,
    },
    precio: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  created() {
    this.getImageData();
  },
  data() {
    return {
      imageData: "",
      imageWidth: null,
      imageHeight: null,
      cardWidth: "250px",
      cardHeight: "300px",
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown; // Verifica si la pantalla es pequeña o menor
    },
  },
  methods: {
    getImageData() {
      const img = new Image();
      img.src = "data:image/jpeg;base64," + this.image;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (img.width > 250 || img.height > 300) {
          if (img.width > 250) {
            this.imageWidth = "195px";
            this.imageHeight = `${195 / aspectRatio}px`;
          }
          if (img.height > 300) {
            this.imageHeight = "195px";
            this.imageWidth = `${195 * aspectRatio}px`;
          }
        } else {
          this.imageWidth = `${img.width}px`;
          this.imageHeight = `${img.height}px`;
        }
        this.imageData = img.src;
      };
    },
    formatPrice(price) {
      const formattedPrice = price
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedPrice;
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 100%;
  height: 256px;
}
.image-container {
  display: ruby-text;
}
.disponible {
  color: green !important;
}
.no-disponible {
  color: red !important;
}

</style>
