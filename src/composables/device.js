import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const config = {
  headers: { Authorization: `Bearer ${authStore.token}` },
};

export function destroyDevice(id) {
  if (!window.confirm("Are you sure?")) {
    return Promise.reject("User cancelled deletion");
  }
  return axios
    .delete(`http://localhost:9191/device/${id}`, config)
    .then(() => {
      window.location.reload();
      return axios.get("http://localhost:9191/device/all", config);
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error; // re-throw error to propagate it to the calling code
    });
}
