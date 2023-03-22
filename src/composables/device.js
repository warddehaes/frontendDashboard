import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default function useDevice() {
  const devices = ref([]);
  const authStore = useAuthStore();

  const config = {
    headers: { Authorization: `Bearer ${authStore.token}` },
  };

  const bodyParameters = {
    key: "value",
  };

  const getDevices = async (id) => {
    axios
      .get("http://localhost:9191/device/all", config)
      .then((response) => {
        deviceList.value = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const destroyDevice = async (id) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    await axios.delete("devices/" + id);
    await getDevices();
  };

  return {
    devices,
    getDevices,
    destroyDevice,
  };
}
