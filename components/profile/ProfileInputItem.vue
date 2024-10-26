<template>
  <div class="input-container">
    <span class="input-container__header">
      <label v-if="label" class="input-container__label">{{ label }}</label>
      <p v-if="description" class="input-container__description">{{ description }}</p>
    </span>
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
    />
  </div>
</template>

<script lang="ts" setup>
import AlertApp from '@/components/alerts/AlertApp.vue';

const props = defineProps({
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
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  //padding: 5px 10px;

  &__header {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &__label {
    font-size: 14px;
    //font-weight: bolder;
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
