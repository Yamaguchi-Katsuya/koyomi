import { validateMonth, validateDay } from '../utils/validation';
import { Holiday } from '../types/holiday';
import { fetchHolidays } from './holidayUtils';
import { Era } from '../types/era';
import { Eto, etoList } from '../types/eto';

export const convertSeirekiToWareki = (year: number): string => {
  if (year >= 2019) {
    return `令和${year - 2018}年`;
  } else if (year >= 1989) {
    return `平成${year - 1988}年`;
  } else if (year >= 1926) {
    return `昭和${year - 1925}年`;
  } else if (year >= 1912) {
    return `大正${year - 1911}年`;
  } else if (year >= 1868) {
    return `明治${year - 1867}年`;
  } else {
    return '明治以前';
  }
};

export const convertWarekiToSeireki = (era: Era, year: number): number | '' => {
  switch (era) {
    case '令和':
      return 2018 + year;
    case '平成':
      return 1988 + year;
    case '昭和':
      return 1925 + year;
    case '大正':
      return 1911 + year;
    case '明治':
      return 1867 + year;
    default:
      return '';
  }
};

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  return age;
};

export const getEto = (year: number): Eto => {
  return etoList[(year + 8) % 12];
};
