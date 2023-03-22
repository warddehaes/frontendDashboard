<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const spaceList = ref([]);
const authStore = useAuthStore();
const deviceId = ref("");
const deviceName = ref("");
const category = ref("");
const spaceId = ref("");
const onOff = ref("ON");

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

async function updateDevice() {
  try {
    const response = await axios.put(
      `http://localhost:9191/device/${deviceId.value}`,
      {
        name: deviceName.value,
        category: category.value,
        spaceId: spaceId.value,
        onOff: onOff.value === "ON" ? 1 : 0,
      },
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );
    console.log(response.data);
    // TODO: add logic to handle successful device update
  } catch (error) {
    console.error(error);
    // TODO: add logic to handle error
  }
}
</script>

<template>
  <div class="device-update">
    <h2>Update Device</h2>
    <label for="device-id">Device ID:</label>
    <input type="text" v-model="deviceId" id="device-id" />
    <br />
    <label for="device-name">Device Name:</label>
    <input type="text" v-model="deviceName" id="device-name" />
    <br />
    <label for="device-category">Device Category:</label>
    <input type="text" v-model="category" id="device-category" />
    <br />
    <div>
      <label
        for="device-space"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Space</label
      >
      <select v-model="spaceId" id="device-space">
        <option selected="" value="">Select a space</option>
        <option v-for="space in spaceList" :key="space.id" :value="space.id">
          {{ space.id }}
        </option>
      </select>
    </div>
    <div>
      <label for="device-onoff">On/Off:</label>
      <select v-model="onOff" id="device-onoff">
        <option value="ON">ON</option>
        <option value="OFF">OFF</option>
      </select>
    </div>
    <button @click="updateDevice">Update Device</button>
  </div>
</template>
