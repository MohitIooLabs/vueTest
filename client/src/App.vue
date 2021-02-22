<template>
  <v-app>
    <!-- <router-view></router-view> -->
    <DashBoard></DashBoard>
  </v-app>
</template>

<script>
import DashBoard from './components/Dashboard.vue'

export default {
  name: 'App',
  components: {
    DashBoard
  }
}
</script>

<style>
</style>
