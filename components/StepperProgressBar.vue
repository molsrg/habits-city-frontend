<script lang="ts" setup>
const props = defineProps({
  steps: {
    type: Array as () => string[],
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
});

const progressWidth = computed(() => {
  return `${(props.currentStep / (props.steps.length - 1)) * 100}%`;
});
</script>

<template>
  <div class="flex flex-col">
    <div class="relative w-full h-2 bg-gray-200 rounded-lg">
      <div
        :style="{ width: progressWidth }"
        class="absolute h-full bg-green-700 rounded-lg transition-all duration-700"
      />
    </div>

    <div class="flex justify-between mt-2">
      <span
        v-for="(step, index) in steps"
        :key="index"
        :class="{
          'text-green-600': index < currentStep,
          'text-green-400': index === currentStep,
          'text-gray-600': index > currentStep
        }"
        class="text-sm flex-1 text-center"
      >
        {{ step }}
      </span>
    </div>
  </div>
</template>
