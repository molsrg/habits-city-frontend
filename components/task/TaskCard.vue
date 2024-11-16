<script lang="ts" setup>

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});

defineEmits(['update:status']);

const toggleCompleted = () => {
  emit('update:status', props.content.id);
};
</script>

<template>
  <UCard>
    <div class="task-card__header">
      <span
        :class="{ 'task-card__status--completed': content.completed }"
        class="task-card__status"
        @click="toggleCompleted"
      />
      <h2 class="task-card__title">{{ content.name }}</h2>
      <UBadge class="task-card__username" color="white" variant="solid">
        @ {{ content.user }}
      </UBadge>
    </div>
  </UCard>
</template>

<style lang="scss" scoped>
.task-card {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }

  &__title {
    font-weight: bold;
    width: 80%;
    text-align: justify;
  }

  &__username {
    white-space: nowrap;
  }

  &__status {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease, border 0.3s ease, transform 0.2s ease;
  }

  &__status--completed {
    background-color: #4CAF50;
    border-color: #4CAF50;
    transform: scale(1.2);
  }
}
</style>
