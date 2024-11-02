export const useAccountForm = () => {
  const { t } = useI18n();

  return computed(() => ({
    name: {
      disabled: false,
      required: false,
      placeholder: t('page--profile.settings-option.name.placeholder'),
      label: t('page--profile.settings-option.name.label'),
      inputType: 'text',
      description: t('page--profile.settings-option.name.description'),
    },
    username: {
      disabled: false,
      required: true,
      placeholder: t('page--profile.settings-option.username.placeholder'),
      label: t('page--profile.settings-option.username.label'),
      inputType: 'text',
      description: t('page--profile.settings-option.username.description'),
    },
    email: {
      disabled: true,
      required: false,
      placeholder: t('page--profile.settings-option.email.placeholder'),
      label: t('page--profile.settings-option.email.label'),
      inputType: 'text',
      description: t('page--profile.settings-option.email.description'),
      actions: {
        link: {
          label: t('page--profile.link-email'),
          color: 'primary',
          size: '2xs',
          variant: 'soft',
          action: 'linkEmail',
          condition: true,
        },
        change: {
          label: t('page--profile.change-email'),
          color: 'primary',
          size: '2xs',
          variant: 'soft',
          action: 'changeEmail',
          condition: false,
        },
      },
    },
    password: {
      disabled: false,
      required: true,
      placeholder: t('page--profile.settings-option.password.placeholder'),
      label: t('page--profile.settings-option.password.label'),
      inputType: 'password',
    },
    new_password: {
      disabled: false,
      required: true,
      placeholder: t('page--profile.settings-option.new-password.placeholder'),
      label: t('page--profile.settings-option.new-password.label'),
      inputType: 'password',
      description: t('page--profile.settings-option.new-password.description'),
    },
  }));
};

export const useAccountTabsForm = () => {
  const { t } = useI18n();

  return computed(() => [
    {
      key: 'account',
      label: t('page--profile.settings-option.nav.account.label'),
      description: t('page--profile.settings-option.nav.account.description'),
      fields: ['name', 'username', 'email'],
      actions: {
        save: {
          label: t('page--profile.save-account'),
          color: 'black',
          variant: 'solid',
          action: 'saveAccount',
          disabled: ['name', 'username'],
        },
        delete: {
          label: t('page--profile.delete-account'),
          color: 'red',
          type: 'submit',
          variant: 'outline',
          // icon: 'i-heroicons-trash',
          action: 'deleteAccount',
        },
      },
    },
    {
      key: 'password',
      label: t('page--profile.settings-option.nav.password.label'),
      description: t('page--profile.settings-option.nav.password.description'),
      fields: ['password', 'new_password'],
      actions: {
        save: {
          label: t('page--profile.save-password'),
          color: 'black',
          type: 'submit',
          variant: 'solid',
          action: 'savePassword',
          disabled: ['password', 'new_password'],
        },
      },
    },
  ]);
};