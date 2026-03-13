export const formatDisplayDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/** Short date range e.g. "Mar 4 – Mar 10" */
export const formatShortDateRange = (start: Date, end: Date) =>
  `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

/** ISO date string YYYY-MM-DD in local timezone (for matching API dates) */
export const toISODate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Format 24h "HH:mm" to 12h "h:mm A" (e.g. "20:00" -> "8:00 PM") */
export const formatTimeForDisplay = (time24: string | null): string => {
  if (!time24) return '';
  const [h = '0', m = '0'] = time24.split(':');
  const hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
};

/** Mood string to 1–5 score */
export const moodToScore = (
  mood: 'TERRIBLE' | 'BAD' | 'OK' | 'GOOD' | 'GREAT' | null,
): number => {
  if (mood == null) return 0;
  const map: Record<string, number> = {
    TERRIBLE: 1,
    BAD: 2,
    OK: 3,
    GOOD: 4,
    GREAT: 5,
  };
  return map[mood] ?? 0;
};

