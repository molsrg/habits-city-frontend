<script setup>
import Chart from 'primevue/chart';

const props = defineProps({
  labels: { type: Array, required: true },
  datasets: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => {
  const total = props.datasets.reduce((sum, value) => sum + value, 0);
  return {
    labels: props.labels,
    datasets: [
      {
        data: props.datasets,
        backgroundColor: ['rgb(74, 221, 128)', 'rgb(96, 152, 207)', 'rgb(249, 115, 22)', 'rgb(241, 85, 96)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(74, 221, 128, 0.8)', 'rgba(96, 152, 207, 0.8)', 'rgba(249, 115, 22, 0.8)', 'rgba(241, 85, 96, 0.8)'],
        hoverBorderColor: 'white',
        borderAlign: 'inner',
        percentage: props.datasets.map((value) => ((value / total) * 100).toFixed(2)),
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          const percentage = chartData.value.datasets[0].percentage[context.dataIndex];
          return `${value} (${percentage}%)`;
        },
      },
    },
  },
}));
</script>

<template>
  <Chart :data="chartData" :options="chartOptions" type="pie" />
</template>
