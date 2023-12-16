import { defineChartComponent } from "vue-chart-3";
import {
  LineController,
  LinearScale,
  BarController,
  CategoryScale,
  Chart,
} from "chart.js";

export default defineNuxtPlugin((nuxtApp) => {
  // Register the required chart components
  Chart.register(LineController, LinearScale, BarController, CategoryScale);

  // Define the chart component
  const LineChart = defineChartComponent("line", "line");

  // Make the LineChart component available in all components
  nuxtApp.vueApp.component("LineChart", LineChart);
});
