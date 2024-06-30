import { Era, eraRanges } from '../types/era';

export const validateWarekiYear = (
  era: Era,
  year: number | ''
): { valid: boolean; message: string } => {
  if (year === '') {
    return { valid: true, message: '' };
  }

  if (
    !isNaN(year) &&
    year >= eraRanges[era].start &&
    year <= eraRanges[era].end
  ) {
    return { valid: true, message: '' };
  } else {
    return {
      valid: false,
      message: `${era}は${eraRanges[era].start}年 ~ ${eraRanges[era].end}年までです`,
    };
  }
};

export const validateMonth = (month: number | ''): number | '' => {
  if (month === '' || isNaN(month) || month < 1 || month > 12) {
    return '';
  }
  return month;
};

export const validateDay = (
  year: number,
  month: number | '',
  day: number | ''
): number | '' => {
  if (day === '' || isNaN(day) || day < 1) {
    return '';
  }

  if (month === '' || isNaN(month) || month < 1 || month > 12) {
    return '';
  }

  const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based, 0 returns the last day of the previous month
  if (day > daysInMonth) {
    return '';
  }

  return day;
};
