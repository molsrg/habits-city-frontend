import { friendStatus } from '@/constants/friendStatus';

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
      value: friendStatus.NOT_FOLLOWING,
      color: 'indigo',
    },
    {
      label: t('global.filters.friends.followed'),
      value: friendStatus.FOLLOWED,
      color: 'emerald',
    },
    {
      label: t('global.filters.friends.following'),
      value: friendStatus.FOLLOWING,
      color: 'blue',
    },
    {
      label: t('global.filters.friends.friends'),
      value: friendStatus.FRIENDS,
      color: 'green',
    },
  ]);
};
