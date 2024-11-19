const { t } = useI18n();
export const faqOptions = computed(() => [
  {
    label: t('page--index.faq.options.register'),
    icon: 'i-heroicons-user-circle',
    content: t('page--index.faq.options.register_content'),
  },
  {
    label: t('page--index.faq.options.add_friend'),
    icon: 'i-heroicons-user',
    content: t('page--index.faq.options.add_friend_content'),
  },
  {
    label: t('page--index.faq.options.modify_account'),
    icon: 'i-heroicons-cog',
    content: t('page--index.faq.options.modify_account_content'),
  },
  {
    label: t('page--index.faq.options.create_group'),
    icon: 'i-heroicons-users',
    content: t('page--index.faq.options.create_group_content'),
  },
  {
    label: t('page--index.faq.options.change_avatar'),
    icon: 'i-heroicons-camera',
    content: t('page--index.faq.options.change_avatar_content'),
  },
  {
    label: t('page--index.faq.options.change_password'),
    icon: 'i-heroicons-lock-closed',
    content: t('page--index.faq.options.change_password_content'),
  },

  {
    label: t('page--index.faq.options.recover_account'),
    icon: 'i-heroicons-key',
    content: t('page--index.faq.options.recover_account_content'),
  },
]);
