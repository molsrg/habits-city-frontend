<script lang="ts" setup>
import { ref } from 'vue';

const { setLocale, t } = useI18n();
const toast = useToast();
const validTypes = {
  img: ['image/jpeg', 'image/png', 'image/gif'],
  file: ['application/pdf', 'application/docx'],
  video: ['video/mp4', 'video/x-m4v'],
} as const;

const props = defineProps<{
  fileType: keyof typeof validTypes;
  label?: string;
  icon?: string;
  variant?: 'filled' | 'outline';
}>();

const emit = defineEmits<{
  (event: 'upload:file', file: File): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (validTypes[props.fileType].includes(file.type)) {
      selectedFile.value = file;
      emit('upload:file', file);
    } else {
      toast.add({ color: 'red', title: t('notifications.save-error'), timeout: 2000 });
    }
  }
};
</script>

<template>
  <div class="file-upload">
    <label
      :class="['file-upload__label', props.variant || 'filled']"
      @click="fileInput?.click()"
    >
      <UIcon v-if="icon" :name="icon" />
      {{ label || '' }}
    </label>
    <input
      ref="fileInput"
      :accept="fileType === 'img' ? 'image/*' : fileType === 'video' ? 'video/*' : '*'"
      class="file-upload__input"
      hidden
      type="file"
      @change="handleFileChange"
    >
  </div>
</template>

<style lang="scss" scoped>
.file-upload {
  position: relative;
  display: inline-block;

  &__label {
    @apply px-3 py-2 rounded cursor-pointer transition duration-300;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;

    & span {
      width: 20px;
      height: 20px;
    }

    &.filled {
      @apply bg-green-900 text-white;

      &:hover {
        @apply bg-green-600;
      }
    }

    &.outline {
      @apply border-0 bg-transparent;

      &:hover {
        @apply bg-green-900;
      }
    }
  }

  &__input {
    display: none;
  }
}

</style>
