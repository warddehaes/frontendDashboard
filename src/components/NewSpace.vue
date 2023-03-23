<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
const spaceList = ref([]);
const FORM: any = ref({
  onOff: 0, //standaard op uit ingesteld (placeholder)
});
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
const addSpace = async (event: any) => {
  event.preventDefault(); // prevent form from submitting normally
  console.log("FORM", JSON.stringify(FORM.value));
  const response = await fetch("http://localhost:9191/space/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
    body: JSON.stringify(FORM.value),
  });
  if (response.ok) {
    const newSpace = await response.json();
    console.log(newSpace);
    // TODO: add logic to handle successful device creation
  } else {
    console.error(response.statusText);
    // TODO: add logic to handle error testtt
  }
};
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add a new space
      </h2>
      <form action="#">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Space Name</label
            >
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type space name"
              required=""
              v-model="FORM.naam"
            />
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800"
          @click="addSpace"
        >
          Add space
        </button>
      </form>
    </div>
  </section>
</template>
