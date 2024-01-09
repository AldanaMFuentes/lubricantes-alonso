<template>
  <v-container class="centered-container text-button">
    <h1>DOMINIO INCORRECTO</h1>
    <h3>Te invitamos a seguir recorriendo nuestra página</h3>
    <router-link to="/"
      ><v-btn outlined color="primary"> página principal</v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Agregado para centrar verticalmente */
  height: 70vh; /* Opcional: ajusta la altura del contenedor al 100% de la ventana */
}
</style>
