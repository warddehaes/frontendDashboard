<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SpaceCard from "../components/SpaceCard.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const spaceList = ref([]);
const authStore = useAuthStore();

const config = {
  headers: { Authorization: `Bearer ${authStore.token}` },
};

// Import the computed property userRole from the auth store
const { role } = useAuthStore();

const bodyParameters = {
  key: "value",
};

onMounted(() => {
  axios
    .get("http://localhost:9191/space/all", config)
    .then((response) => {
      spaceList.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<template>
  <div v-if="role === 'ROLE_ADMIN'">
    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
      <RouterLink to="/spaces/newspace">
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          New Space
        </button>
      </RouterLink>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-4">
    <SpaceCard
      v-for="space in spaceList"
      :key="space.id"
      :space="space"
    ></SpaceCard>
  </div>
</template>
