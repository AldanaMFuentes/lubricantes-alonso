<template>
  <v-col cols="4">
    <v-card class="product-card">
      {{ denominacion }}
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
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.product-card {
  width: 288px;
  height: 256px;
}
</style>