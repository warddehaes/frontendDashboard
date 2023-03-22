<script lang="ts" setup>
import { ref, onMounted } from "vue";
import DeviceCard from "../components/DeviceCard.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const deviceList = ref([]);
const authStore = useAuthStore();

const config = {
  headers: { Authorization: `Bearer ${authStore.token}` },
};

const bodyParameters = {
  key: "value",
};

onMounted(() => {
  axios
    .get("http://localhost:9191/device/all", config)
    .then((response) => {
      deviceList.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<template>
  <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
    <RouterLink to="/devices/newdevice">
      <button
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        New Device
      </button>
    </RouterLink>

    <div class="grid grid-cols-1 gap-4">
      <DeviceCard
        v-for="device in deviceList"
        :key="device.id"
        :device="device"
      ></DeviceCard>
    </div>
  </div>
</template>
