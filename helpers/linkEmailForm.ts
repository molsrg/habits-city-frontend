export const useLinkEmailForm = () => {
  const { t } = useI18n();

  return computed(() => ({
    title: t('modal.link-email.title'),
    description: t('modal.link-email.description'),
    stepper: {
      steps: {
        enter: {
          title: t('modal.link-email.steppers.enter-email'),
        },
        confirm: {
          title: t('modal.link-email.steppers.confirm-email'),
        },
      },
      actions: {
        prev: {
          label: t('stepper.prev'),
          color: 'primary',
          variant: 'soft',
          action: 'prev',
        },
        next: {
          label: t('stepper.next'),
          action: 'next',
          color: 'primary',
          variant: 'soft',
        },
      },
    },
  }));
};
