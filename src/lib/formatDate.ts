import { BlogCategory } from '@/types';

export function formatPostDate(dateStr: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return dateStr;
  const [, year, month, day] = match;
  const utcDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(utcDate);
}

const CATEGORY_BADGE_MAP: Record<BlogCategory, string> = {
  'Running & Endurance': 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  'Engineering & Makers': 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20',
  'Leadership & Strategy': 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20',
  'Family & Philosophy': 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/20',
};

export function getCategoryBadgeClasses(category: BlogCategory): string {
  return (
    CATEGORY_BADGE_MAP[category] ??
    'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20'
  );
}
