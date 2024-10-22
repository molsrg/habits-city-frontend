<template>
  <div class="profile-settings-detail">
    <div class="profile-settings-detail--change">
      <span>{{ props.label }}</span>
      <UButton
        :icon="isDisabled ? 'i-heroicons-lock-closed' : 'i-heroicons-lock-open'"
        size="2xs"
        variant="ghost"
        @click="toggleDisabled"
      />
    </div>
    <InputText
      v-model="localValue"
      :disabled="isDisabled"
      :type="inputType"
      class="phone-number"
    />
    <Transition>
      <div>
        <AlertApp
          v-for="(error, index) in errors"
          :key="index"
          :isVisible="!!error"
          :label="error"
          type="error"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import AlertApp from '@/components/alerts/AlertApp';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: true,
  },
  errors: {
    type: Array as () => string[],
    default: () => [],
  },
  inputType: {
    type: String,
    default: 'text',
  },
});

const localValue = ref(props.modelValue);
const emit = defineEmits(['update:modelValue', 'update:isDisabled']);

const toggleDisabled = () => {
  emit('update:isDisabled', !props.isDisabled);
};

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
