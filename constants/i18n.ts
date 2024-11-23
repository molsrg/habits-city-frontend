export function getDayDeclension(count: number, t: (key: string) => string): string {
  const remainder100 = count % 100;
  const remainder10 = count % 10;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return t('global.day.many');
  }

  if (remainder10 === 1) {
    return t('global.day.one');
  }

  if (remainder10 >= 2 && remainder10 <= 4) {
    return t('global.day.few');
  }

  return t('global.day.many');
}
