<script lang="ts" setup>
import { useFaqOptions } from '@/constants/faqOptions';

const { t } = useI18n();
const faqOptions = useFaqOptions();
definePageMeta({
  layout: 'default',
  colorMode: 'dark'
});
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center text-white">
    <header class="w-full py-10 text-center text-white">
      <h1 class="text-5xl font-semibold text-[#4ade80]">{{ $t('page--index.welcome') }}</h1>
      <UContainer class="home__quote">
        <UBadge class="home__quote-author" color="white" variant="solid">@molsrg</UBadge>
        <div class="home__quote-text">
          {{ $t('page--index.badge') }}
        </div>
      </UContainer>
    </header>

    <main class="w-full flex-1 px-4 md:px-8">
      <section class="py-8 text-center">
        <h2 class="text-4xl font-semibold text-[#4ade80]">{{ $t('page--index.trackYourProgress') }}</h2>
        <p class="mt-4 text-xl text-gray-300">{{ $t('page--index.trackDescription') }}</p>
        <div class="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div class="rounded-lg bg-[#1f2937] p-6 shadow-lg">
            <h3 class="text-2xl font-semibold text-[#4ade80]">{{ $t('page--index.setGoals') }}</h3>
            <p class="mt-4 text-gray-200">{{ $t('page--index.setGoalsDescription') }}</p>
          </div>
          <div class="rounded-lg bg-[#1f2937] p-6 shadow-lg">
            <h3 class="text-2xl font-semibold text-[#4ade80]">{{ $t('page--index.stayMotivated') }}</h3>
            <p class="mt-4 text-gray-200">{{ $t('page--index.stayMotivatedDescription') }}</p>
          </div>
          <div class="rounded-lg bg-[#1f2937] p-6 shadow-lg">
            <h3 class="text-2xl font-semibold text-[#4ade80]">{{ $t('page--index.celebrateSuccess') }}</h3>
            <p class="mt-4 text-gray-200">{{ $t('page--index.celebrateSuccessDescription') }}</p>
          </div>
        </div>
      </section>

      <section class="bg-[#121212] py-8 text-center">
        <h2 class="text-4xl font-semibold text-[#4ade80]">{{ $t('page--index.howItWorks') }}</h2>
        <div class="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div class="rounded-lg bg-[#1f2937] p-6 shadow-lg">
            <UIcon class="mx-auto text-[#4ade80]" name="i-heroicons-check-circle" size="32" />
            <h3 class="mt-6 text-xl font-semibold text-[#4ade80]">{{ $t('page--index.createTasks') }}</h3>
            <p class="mt-4 text-gray-200">{{ $t('page--index.createTasksDescription') }}</p>
          </div>
          <div class="rounded-lg bg-[#1f2937] p-6 shadow-lg">
            <UIcon class="mx-auto text-[#4ade80]" name="i-heroicons-users" size="32" />
            <h3 class="mt-6 text-xl font-semibold text-[#4ade80]">{{ $t('page--index.followFriends') }}</h3>
            <p class="mt-4 text-gray-200">{{ $t('page--index.followFriendsDescription') }}</p>
          </div>
          <div class="rounded-lg bg-[#1f2937] p-6 shadow-lg">
            <UIcon class="mx-auto text-[#4ade80]" name="i-heroicons-chart-bar" size="32" />
            <h3 class="mt-6 text-xl font-semibold text-[#4ade80]">{{ $t('page--index.viewReports') }}</h3>
            <p class="mt-4 text-gray-200">{{ $t('page--index.viewReportsDescription') }}</p>
          </div>
        </div>
      </section>

      <section class="bg-[#121212] py-8 text-center">
        <h2 class="mb-8 text-4xl font-semibold text-[#4ade80]">{{ $t('page--index.faq.title') }}</h2>
        <UAccordion :items="faqOptions" />
      </section>
    </main>

    <footer class="py-6 text-center text-white">
      <p>{{ $t('page--index.footer') }}</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.home {
  &__quote {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 10px;
    padding: 10px;
    border-radius: 10px;
    border: #18181b solid 2px;
    margin-top: 20px;

    &-author {
      margin-left: 1vw;
      margin-bottom: 10px;
    }

    &-text {
    }
  }
}
</style>
