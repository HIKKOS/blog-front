<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'

const isLogged = ref(true)
</script>

<template>
  <NavBar v-if="isLogged"></NavBar>
  <RouterView />
</template>
