import React, { useState, useEffect } from 'react';
import { handleDateChange } from '../utils/dateUtils';
import { Eto } from '../types/eto';
import { Holiday } from '../types/holiday';

const AgeCalculator: React.FC = () => {
  const [birthYear, setBirthYear] = useState<number | ''>('');
  const [birthMonth, setBirthMonth] = useState<number | ''>('');
  const [birthDay, setBirthDay] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [eto, setEto] = useState<Eto | ''>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    handleDateChange(
      birthYear,
      birthMonth,
      birthDay,
      setAge,
      setEto,
      setHolidays,
      setErrorMessage
    );
  }, [birthYear, birthMonth, birthDay]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthMonth(parseInt(e.target.value, 10));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDay(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h2>年齢算出</h2>
      <div>
        <h3>西暦</h3>
        <input
          type="number"
          value={birthYear}
          onChange={handleYearChange}
          placeholder="年"
          required
        />
        <input
          type="number"
          value={birthMonth}
          onChange={handleMonthChange}
          max={12}
          placeholder="月"
        />
        <input
          type="number"
          value={birthDay}
          onChange={handleDayChange}
          max={31}
          placeholder="日"
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>年齢: {age}</p>
      <p>干支: {eto}</p>
      <h3>祝日情報</h3>
      <ul>
        {holidays.map((holiday, index) => (
          <li key={index}>
            <h4>{holiday.name}</h4>
            <p>{holiday.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgeCalculator;
