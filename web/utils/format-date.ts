export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const parts = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const result = `${map.weekday}, ${map.day}.${map.month}.${map.year}`;

  return result;
}
