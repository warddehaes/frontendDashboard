<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <Navbar />
    <RouterView />
  </div>
</template>
