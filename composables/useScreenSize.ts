export const useScreenSize = () => {
  const isDesktop = ref<boolean>(false);

  const checkScreenSize = (): void => {
    isDesktop.value = window.innerWidth >= 600;
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
  });

  return { isDesktop };
};
