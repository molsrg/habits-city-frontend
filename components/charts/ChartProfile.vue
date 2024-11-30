<script lang="ts" setup>
import Chart from 'primevue/chart';

const { t } = useI18n();
const props = defineProps({
  labels: { type: Array as () => string[], required: true },
  datasets: {
    type: Object as () => { following: number[]; followers: number[]; friends: number[] },
    required: true,
  },
});

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: t('chart.friends-stat.following'),
      data: props.datasets.following,
      borderWidth: 2,
      borderColor: 'rgb(96, 152, 207)',
      backgroundColor: 'rgba(96, 152, 207, 0.4)',
      tension: 0.4,
    },
    {
      label: t('chart.friends-stat.followers'),
      data: props.datasets.followers,
      borderWidth: 2,
      borderColor: 'rgb(249, 115, 22)',
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      tension: 0.4,
    },
    {
      label: t('chart.friends-stat.friends'),
      data: props.datasets.friends,
      borderWidth: 2,
      borderColor: 'rgb(74, 221, 128)',
      backgroundColor: 'rgba(74, 221, 128, 0.4)',
      tension: 0.4,
    },
  ],
}));
</script>

<template>
  <Chart :data="chartData" type="line" />
</template>
