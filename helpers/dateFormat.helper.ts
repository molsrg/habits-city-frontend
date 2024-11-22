export function daysSince(timestamp: string | number | Date): number {
  const now = new Date();
  const past = new Date(timestamp);

  const diffInMs = now.getTime() - past.getTime();

  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}
