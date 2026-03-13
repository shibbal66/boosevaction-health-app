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

