<script>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  setup() {
    // use the Pinia store
    const authStore = useAuthStore();

    onMounted(() => {
      axios
        .get("http://localhost:9191/historicdata/temperatures", {
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        .then((response) => {
          const data = response.data;
          const labels = data.map((_, index) => `Temperature ${index + 1}`);
          const chartData = {
            labels,
            datasets: [
              {
                label: "Temperature",
                backgroundColor: "blue",
                data,
              },
            ],
          };
          const chartOptions = {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };
          const tempChart = new Chart(document.getElementById("tempChart"), {
            type: "bar",
            data: chartData,
            options: chartOptions,
          });
        });
    });
  },
};
</script>
