<script lang="ts" setup>
const selectedFilter = ref<string>('');
const props = defineProps({
  filters: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:filter']);

const handleButtonClick = (button: string) => {
  selectedFilter.value = button;
  emit('update:filter', button);
};
</script>

<template>
  <UButton
    v-for="button in props.filters"
    :key="button.value"
    :color="button.color"
    :variant="selectedFilter === button.value ? 'outline' : 'soft'"
    @click="handleButtonClick(button.value)"
  >
    {{ button.label }}
  </UButton>
</template>
