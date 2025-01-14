<template>
  <UBadge
    v-if="isVisible"
    :color="badgeColor"
    :label="label"
    :size="size"
    :variant="variant" />
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

interface Props {
  label: string;
  isVisible: boolean;
  type: 'error' | 'success' | 'warning' | 'default';
  variant: string;
  size: 'xs' | 'sm' | 'md' | 'lg';
}

const props = defineProps<Props>();

const badgeColor = computed<string>(() => {
  switch (props.type) {
    case 'error':
      return 'red';
    case 'success':
      return 'green';
    case 'warning':
      return 'yellow';
    default:
      return 'gray';
  }
});
</script>
