import React, { useState } from 'react';
import { calculateAge, getEto } from '../utils/dateUtils';
import { Eto } from '../types/eto';
import { Holiday } from '../types/holiday';
import Heading from '../ui/Heading';
import { D_GRAY, L_GRAY, WHITE } from '../types/color';
import SectionLayout from '../layout/SectionLayout';
import Circle from '../ui/Circle';
import { validateDay, validateMonth } from '../utils/validation';
import { fetchHolidays } from '../utils/holidayUtils';

function AgeCalculator(): JSX.Element {
  const [year, setYear] = useState<number | ''>('');
  const [month, setMonth] = useState<number | ''>('');
  const [day, setDay] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [eto, setEto] = useState<Eto | ''>('');
  const [errorMessage, setErrorMessage] = useState<string | ''>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isResultReady, setIsResultReady] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const { inputYear, inputMonth, inputDay } = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([key, value]) => [key, Number(value)])
    ) as {
      inputYear: number;
      inputMonth: number;
      inputDay: number;
    };

    if (isNaN(inputYear) || isNaN(inputMonth) || isNaN(inputDay)) {
      setErrorMessage('年月日には数字を入力してください。');
      return;
    }

    if (!validateMonth(inputMonth) || !validateDay(inputYear, inputMonth, inputDay)) {
      setErrorMessage('月または日に無効な値が入力されています。');
      return;
    }

    setErrorMessage('');

    setYear(inputYear);
    setMonth(inputMonth);
    setDay(inputDay);
    const birthDate = new Date(inputYear, inputMonth - 1, inputDay);
    setAge(calculateAge(birthDate));
    setEto(getEto(inputYear));
    const holidays = await fetchHolidays(inputMonth, inputDay);
    setHolidays(holidays);
    setIsResultReady(true);

    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  return (
    <>
      <SectionLayout bgColor={WHITE}>
        <Circle bgColor={D_GRAY}>
          <Heading textColor={WHITE} text="DATE" />
          <p className="text-white font-kiwi">
            今日は何の日？
            <br />
            干支・星座・年齢を調べてみよう！
          </p>
          <form className='w-3/4 mb-2 md:mb-0 flex flex-col gap-1 md:gap-9' onSubmit={handleSubmit}>
            <div className="grid grid-cols-11 text-white font-kiwi">
              <input
                type="number"
                name="inputYear"
                className="border border-gray-400 rounded-md col-span-4 text-black text-center"
              />
              <span className="col-span-1">年</span>
              <input
                type="number"
                name="inputMonth"
                max={12}
                className="border border-gray-400 rounded-md col-span-2 text-black text-center"
              />
              <span className="col-span-1">月</span>
              <input
                type="number"
                name="inputDay"
                max={31}
                className="border border-gray-400 rounded-md col-span-2 text-black text-center"
              />
              <span className="col-span-1">日</span>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button
              className="bg-l-gray text-white font-mono rounded-full py-1 px-6 md:py-2 md:px-12"
              type='submit'
            >
              GO
            </button>
          </form>
        </Circle>
      </SectionLayout>
      {isResultReady && (
        <SectionLayout bgColor={WHITE}>
          <Circle bgColor={L_GRAY} className="mt-4 md:mt-8 font-kiwi">
            <p className="md:text-4xl font-bold">
              {year ? `${year}年` : ''}
              {month ? `${month}月` : ''}
              {day ? `${day}日` : ''}
            </p>
            <p className="md:text-4xl font-bold">
              {eto} {age ? `${age}歳` : ''}
            </p>
            <div className="w-5/6 md:text-4xl flex flex-col items-center md:gap-6">
              <p className="font-bold">{holidays[0]?.name}</p>
              <p>{holidays[0]?.description}</p>
            </div>
          </Circle>
        </SectionLayout>
      )}
    </>
  );
}

export default AgeCalculator;
