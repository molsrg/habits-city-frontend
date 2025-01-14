<script lang="ts" setup>
import AlertApp from '@/components/BaseUI/alerts/AlertApp.vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Object],
    default: '',
  },
  actions: {
    type: Object,
    default: () => {},
  },
  placeholder: {
    type: String,
    default: '',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: String,
    default: '',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue', 'handle:action']);
</script>

<template>
  <div class="input-container">
    <div class="input-container__header">
      <label v-if="label" class="input-container__label">{{ label }}</label>
      <p v-if="description" class="input-container__description">{{ description }}</p>
      <ul v-for="(button, key) in actions" :key="key">
        <UButton
          :color="button.color"
          :disabled="button.disabled && hasErrors(button.disabled)"
          :icon="button.icon"
          :label="button.label"
          :size="button.size"
          :variant="button.variant"
          @click="$emit('handle:action', button)"
        />
      </ul>
    </div>
    <UInput
      :disabled="isDisabled"
      :model-value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :type="inputType"
      class="input-container__input"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <AlertApp
      v-if="errors"
      :is-visible="!!errors"
      :label="errors"
      class="input-container__alert"
      type="error"
      variant="outline" />
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  &__header {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &__label {
    font-size: 14px;
  }

  &__description {
    font-size: 12px;
    color: #6b7280;
  }

  &__alert {
    margin-left: 15px;
    width: fit-content;
  }
}
</style>
