import { Era, eraRanges } from '../types/era';

export const validateWarekiYear = (
  era: Era,
  year: number | undefined
): { valid: boolean; message: string } => {
  if (year === undefined) {
    return { valid: false, message: '' };
  }

  if (year <= 0) {
    return {
      valid: false,
      message: '元号の年には1以上の数値を入力してください',
    };
  }

  if (year > eraRanges[era].end) {
    return {
      valid: false,
      message: `${era}は${eraRanges[era].start}年 ~ ${eraRanges[era].end}年までです`,
    };
  }

  return { valid: true, message: '' };
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
