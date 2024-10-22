<template>
  <UBadge
    v-if="isVisible"
    :color="badgeColor"
    :label="label"
    :size="size"
    :variant="variant"
  />
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: 'error',
  },
  variant: {
    type: String,
    default: 'subtle',
  },
  size: {
    type: String,
    default: 'xs',
  },
});


const badgeColor = computed(() => {
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

