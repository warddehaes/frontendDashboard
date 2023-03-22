<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const spaceList = ref([]);
const authStore = useAuthStore();
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

/*
const addDevice = async (event) => {
  event.preventDefault(); // prevent form from submitting normally

  const form = event.target;
  const deviceName = form.name.value;
  const category = form.label.value;
  const spaceId = form.space?.value;
  const onOff = form.onOff.value;

  console.log(deviceName, category, spaceId, onOff);

  try {
    const response = await axios.post(
      "http://localhost:9191/device/create",
      {
        naam: deviceName,
        label: category,
        onOff: onOff === "ON" ? 1 : 0,
        space: { id: spaceId },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (response.status === 200) {
      const newDevice = response.data;
      console.log(newDevice);
      // TODO: add logic to handle successful device creation
    } else {
      console.error(response.statusText);
      // TODO: add logic to handle error
    }
  } catch (error) {
    console.error(error);
    // TODO: add logic to handle error
  }
};
*/

async function storeDevice() {
  try {
    const device = await axios.post(
      "http://localhost:9191/device/create",
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

    console.log(device.data);
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="device-add">
    <h2>Add device</h2>
    naam
    <input type="text" v-model="deviceName" /> <br />
    category
    <input type="text" v-model="category" /> <br />
    <div>
      <label
        for="category"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Space</label
      >
      <select v-model="spaceId" id="category">
        <option selected="" value="">Select a space</option>

        <option v-for="space in spaceList" :key="space.id" :value="space.id">
          {{ space.id }}
        </option>
      </select>
      <select v-model="onOff" id="onOff">
        <option value="ON">ON</option>
        <option value="OFF">OFF</option>
      </select>
    </div>

    <button @click="storeDevice">Store Device</button>
  </div>
</template>
