<template>
  <v-col cols="4">
    <v-card class="product-card" min-height="300px" min-width="300px">
      <v-img :src="imageData" height="200px" width="300px">
      </v-img>
      <v-card-title class="text-button pb-4" min-height="56px" style="line-height: 15px;">
        {{ denominacion }}
      </v-card-title>
      <v-card-subtitle class="text-button pb-1 pt-2" style="font-size: 12px !important; line-height: 20px;">
        Precio: ${{ precio }} <br>
        Stock: {{ stock }}
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
      type: String
    }
  },
  created() {

  },
  data() {
    return {
      imageData: "data:image/jpeg;base64," + this.image
    };
  },
};
</script>

<style scoped>
.product-card {
  width: 100%;
  height: 256px;
}
</style>