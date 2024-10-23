<script lang="ts" setup>
import { faqOptions } from '@/values/faqOptions';

definePageMeta({
  layout: 'default',
});
</script>

<template>
  <div class="home">
    <div>
      <UContainer class="home__quote">
        <UBadge class="home__quote-author" color="white" variant="solid">@molsrg</UBadge>
        <div class="home__quote-text">
          {{ $t('page--index.badge') }}
        </div>
      </UContainer>
    </div>
    <UAccordion :items="faqOptions" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;

  &__quote {
    padding: 10px;
    border-radius: 10px;
    border: #18181b solid 2px;

    &-author {
      margin-left: 1vw;
      margin-bottom: 10px;
    }

    &-text {
    }
  }
}
</style>
