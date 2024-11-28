<template>
  <div class="max-w-full overflow-auto">
    <Chart :data="chartData" class="max-w-full" type="line" />
  </div>
</template>

<script lang="ts" setup>
import Chart from 'primevue/chart';

onMounted(() => {
  chartData.value = setChartData();
});

const chartData = ref();

const setChartData = () => {
  const generateRandomData = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 121)); // 12 случайных чисел от 0 до 120
  };

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Отправлено заявок',
        data: generateRandomData(),
        borderWidth: 2,
        borderColor: 'rgb(96, 152, 207)',
        backgroundColor: 'rgba(96, 152, 207, 0.4)',
      },
      {
        label: 'Подписчики',
        data: generateRandomData(),
        borderWidth: 2,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
      },
      {
        label: 'Друзья',
        data: generateRandomData(),
        borderWidth: 2,
        borderColor: 'rgb(74, 221, 128)',
        backgroundColor: 'rgba(74, 221, 128, 0.4)',
      },
    ],
  };
};
</script>
