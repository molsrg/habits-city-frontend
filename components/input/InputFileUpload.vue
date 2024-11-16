<script lang="ts" setup>
const { t } = useI18n();
const toast = useToast();

const props = defineProps<{
  fileType: keyof typeof validTypes;
  label?: string;
  icon?: string;
  variant?: string;
  size?: string;
  color: string;
}>();

const emit = defineEmits(['upload:file']);
const validTypes = {
  img: ['image/jpeg', 'image/png', 'image/gif'],
  file: ['application/pdf', 'application/docx'],
  video: ['video/mp4', 'video/x-m4v'],
} as const;

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
    <UButton
      :color="props.color"
      :icon="props.icon"
      :label="props.label"
      :size="props.size"
      :variant="props.variant"
      @click="fileInput?.click()"
    />
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

