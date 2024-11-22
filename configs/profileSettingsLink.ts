import { computed, ref } from 'vue';

export const activeLink = ref('Settings');

export const changeLink = (link: string) => {
  activeLink.value = link;
};

export const useNavigationLinks = () => {
  const { t } = useI18n();

  const links = [
    { label: 'Settings', click: () => changeLink('Settings') },
    { label: 'Stats', click: () => changeLink('Stats') },
  ];

  const formattedLinks = computed(() =>
    links.map((link) => ({
      ...link,
      label: t(`page--profile.nav.${link.label.toLowerCase()}`),
      active: activeLink.value === link.label,
    })),
  );

  return { formattedLinks, activeLink };
};
