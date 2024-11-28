import { FRIENDS_STATUS } from '@/constants/friends';

export const useFilterConfig = () => {
  const { t } = useI18n();

  return computed(() => [
    {
      label: t('global.filters.friends.all'), // Можно использовать локализацию
      value: '',
      color: 'cyan',
    },
    {
      label: t('global.filters.friends.random'),
      value: FRIENDS_STATUS.NOT_FOLLOWING,
      color: 'indigo',
    },
    {
      label: t('global.filters.friends.followed'),
      value: FRIENDS_STATUS.FOLLOWED,
      color: 'emerald',
    },
    {
      label: t('global.filters.friends.following'),
      value: FRIENDS_STATUS.FOLLOWING,
      color: 'blue',
    },
    {
      label: t('global.filters.friends.friends'),
      value: FRIENDS_STATUS.FRIENDS,
      color: 'green',
    },
  ]);
};
