<template>
  <GitHubActivity />
  <Chart
    :data="chartData"
    type="line" />
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart';

import GitHubActivity from '@/components/charts/GitHubActivity.vue';

onMounted(() => {
  chartData.value = setChartData();
});

const chartData = ref();

const setChartData = () => {
  return {
    labels: [
      '1 May',
      '2 May',
      '3 May',
      '4 May',
      '5 May',
      '6 May',
      '7 May',
      '8 May',
      '9 May',
      '10 May',
      '11 May',
      '12 May',
      '13 May',
      '14 May',
      '15 May',
      '16 May',
      '17 May',
      '18 May',
      '19 May',
      '20 May',
      '21 May',
      '22 May',
      '23 May',
      '24 May',
      '25 May',
      '26 May',
      '27 May',
      '28 May',
      '29 May',
      '30 May',
      '31 May',
    ],
    datasets: [
      {
        label: 'Visitors',
        data: [
          63, 29, 82, 18, 73, 9, 64, 87, 28, 58, 12, 100, 5, 39, 79, 84, 41, 53,
          24, 97, 8, 4, 68, 91, 27, 50, 34, 15, 36, 45,
        ],
        borderWidth: 1,
      },
      {
        label: 'Subscribers',
        data: [
          22, 87, 56, 11, 93, 48, 75, 63, 32, 89, 17, 4, 69, 25, 96, 52, 37, 81,
          7, 59, 91, 28, 66, 41, 84, 16, 71, 54, 39, 98, 20,
        ],
        borderWidth: 1,
      },
    ],
  };
};
</script>

<style>
.p-chart {
  width: 80vw;
  height: 40vw;
}
</style>
