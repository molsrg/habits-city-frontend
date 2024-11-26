export const optionsSupport = () => {
  const { t } = useI18n();

  return computed(() => [
    { name: t('support.topic.options.feature'), value: 'feature', color: '#32d880' },
    { name: t('support.topic.options.documentation'), value: 'docs', color: '#0075ca' },
    { name: t('support.topic.options.bug'), value: 'bug', color: '#d73a4a' },
    { name: t('support.topic.options.other'), value: 'other', color: '#ffffff' },
  ]);
};
