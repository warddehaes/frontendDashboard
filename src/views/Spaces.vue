<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const spaceList = ref([]);
const authStore = useAuthStore();

onMounted(() => {
  console.log(authStore.token); // log the token value
  fetch("http://localhost:9191/space/all", {
    headers: { Authorization: `Bearer ${authStore.token}` },
  })
    .then((response) => response.json())
    .then((apiSpaces) => {
      spaceList.value = apiSpaces;
    });
});
</script>

<template>
  <h1>Spaces</h1>
  <div class="grid grid-cols-3 gap-4">
    <DeviceCard
      v-for="space in spaceList"
      :key="space.id"
      :space="space"
    ></DeviceCard>
  </div>
</template>
