<template>
  <Chart :data="chartData" :options="chartOptions" type="line" />
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart';

const props = defineProps({
  labels: { type: Array as () => string[], required: true },
  datasets: {
    type: Object as () => [],
    required: true,
  },
});
const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.datasets,
      borderWidth: 2,
      borderColor: 'rgb(96, 152, 207)',
      tension: 0.4,
      backgroundColor: 'rgba(96, 152, 207, 0.4)',
      fill: true,
    },
  ],
}));

const chartOptions = computed(() => ({
  plugins: {
    legend: {
      display: false,
    },
  },
}));
</script>
