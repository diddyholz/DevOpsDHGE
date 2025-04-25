<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <NavigationBar />

  <RouterView class="container-lg pt-5"/>
</template>

<style scoped>
</style>
