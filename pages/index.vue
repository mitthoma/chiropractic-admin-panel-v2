<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            >Welcome Pynkerton Chiropractic Notes Dashboard</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardPage",
  data() {
    return {
      chartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Example Data",
            data: [12, 19, 3, 5, 2, 3, 10, 15, 8, 23, 12, 7],
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      },
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
};
</script>
