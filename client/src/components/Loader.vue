<template>
  <v-dialog v-model="showLoading" fullscreen full-width>
  <v-container fluid fill-height style="background-color: rgba(0, 0, 0, 0.5);">
    <v-layout justify-center align-center>
      <v-progress-circular
        indeterminate
        color="rgb(28, 172, 215)">
      </v-progress-circular>
    </v-layout>
  </v-container>
</v-dialog>
</template>
<script>
export default {
    props: ["showLoading"],
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>