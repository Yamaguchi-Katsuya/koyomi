import { HolidaysData, Holiday } from '../types/holiday';

export const fetchHolidays = async (
  month: number,
  day: number
): Promise<Holiday[]> => {
  const key = `${month}-${day}`;
  const response = await fetch('/holidays.json');
  const data: HolidaysData = await response.json();
  return data[key] || [];
};
