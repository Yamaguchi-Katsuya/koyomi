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

export const validateMonth = (month: number): boolean => {
  if (month < 1 || month > 12) {
    return false;
  }
  return true;
};

export const validateDay = (
  year: number,
  month: number,
  day: number
): boolean => {
  if (day < 1) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    return false;
  }

  return true;
};
