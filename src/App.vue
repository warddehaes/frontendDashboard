<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import TempChart from "./components/TempChart.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const shouldHideNavbar = computed(() => {
  return route.path === "/login";
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <template v-if="!shouldHideNavbar">
      <Navbar />
    </template>
    <TempChart />
    <RouterView />
  </div>
</template>
