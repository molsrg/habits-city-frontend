<template>
  <UBadge
    color="red"
    variant="subtle"
    :label="errorMessage"
    size="xs"
  />
</template>

<script setup>
const props = defineProps(['errorMessage'])
</script>

<style lang="scss" scoped></style>



<!-- 

<UBadge
color="red"
variant="subtle"
label="username уже занят !"
size="xs"
v-if="isInvalidUsername"
/> -->