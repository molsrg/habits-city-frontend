<script lang="ts" setup>
import ChartApp from '@/components/charts/ChartApp.vue';
import ChartBalanceHistory from '@/components/charts/ChartBalanceHistory.vue';
import ChartBalanceSummary from '@/components/charts/ChartBalanceSummary.vue';
import { useBalanceStore } from '@/store/balance.store';

definePageMeta({
  middleware: ['auth'],
});
const { t } = useI18n();
const balanceStore = useBalanceStore();
const balanceStat = computed(() => balanceStore.getBalanceStat);
</script>

<template>
  <div class="flex gap-4">
    <div class="flex w-1/2 flex-1 flex-col gap-2">
      <ChartApp :title="t('chart.balance-stat.history')">
        <ChartBalanceHistory :datasets="balanceStat.History.data" :labels="balanceStat.History.labels" />
      </ChartApp>
      <ChartApp :title="t('chart.balance-stat.summary')">
        <ChartBalanceSummary :datasets="balanceStat.Summary.data" :labels="balanceStat.Summary.labels" class="mx-auto w-2/4" />
      </ChartApp>
    </div>
    <UCard class="flex-1">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ea fugiat necessitatibus nobis, odit officiis quo ullam voluptatum. Eaque, soluta,
      veritatis. Aperiam aspernatur at, aut beatae corporis delectus dicta doloribus earum eligendi, esse eum incidunt ipsum, labore magni maiores
      neque nesciunt nobis nulla officia porro possimus quibusdam quidem ratione sint tempora veritatis voluptates voluptatibus. Est hic iure iusto
      magni modi nobis quidem repudiandae, similique. Ad aliquam aliquid cumque debitis, dicta eos eveniet fuga iure iusto magni nihil quae quas quasi
      quod rerum similique, voluptatibus. Commodi distinctio dolore doloribus eius, eligendi est et excepturi fuga laborum molestias nam odit optio
      placeat praesentium voluptas. Accusamus alias aliquid aspernatur atque, doloremque dolores ea, eveniet iure nam quae quas quod rerum sed sint
      velit?
    </UCard>
  </div>
</template>

<style scoped></style>
