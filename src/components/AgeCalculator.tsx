import React, { useState, useEffect } from 'react';
import {
  calculateAge,
  convertWarekiToSeireki,
  getEto,
} from '../utils/dateUtils';
import {
  validateWarekiYear,
  validateMonth,
  validateDay,
} from '../utils/validation';
import { Era, eras } from '../types/era';
import { Eto } from '../types/eto';

const AgeCalculator: React.FC = () => {
  const [birthYear, setBirthYear] = useState<number | ''>('');
  const [birthMonth, setBirthMonth] = useState<number | ''>('');
  const [birthDay, setBirthDay] = useState<number | ''>('');
  const [selectedEra, setSelectedEra] = useState<Era>('令和');
  const [warekiYear, setWarekiYear] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [eto, setEto] = useState<Eto | ''>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (birthYear !== '') {
      const year = birthYear as number;
      const birthDate = new Date(
        year,
        (birthMonth as number) - 1,
        birthDay as number
      );
      setAge(calculateAge(birthDate));
      setEto(getEto(year));
    }
  }, [birthYear, birthMonth, birthDay]);

  useEffect(() => {
    if (warekiYear !== '') {
      const validation = validateWarekiYear(selectedEra, warekiYear as number);
      if (!validation.valid) {
        setErrorMessage(validation.message);
        setAge('');
        setEto('');
      } else {
        setErrorMessage('');
        const seirekiYear = convertWarekiToSeireki(
          selectedEra,
          warekiYear as number
        );
        if (seirekiYear === '') {
          setErrorMessage(`${selectedEra}は正しい年数を入力してください`);
          setAge('');
          setEto('');
        } else {
          setErrorMessage('');
          const month = validateMonth(birthMonth as number);
          const day = validateDay(
            seirekiYear as number,
            month,
            birthDay as number
          );
          setBirthMonth(month);
          setBirthDay(day);
          const birthDate = new Date(
            seirekiYear as number,
            (month === '' ? 1 : month) - 1,
            day === '' ? 1 : day
          );
          setAge(calculateAge(birthDate));
          setEto(getEto(seirekiYear as number));
        }
      }
    }
  }, [warekiYear, selectedEra, birthMonth, birthDay]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const month = validateMonth(parseInt(e.target.value, 10));
    setBirthMonth(month);
    if (birthYear !== '') {
      const day = validateDay(birthYear as number, month, birthDay as number);
      setBirthDay(day);
      const birthDate = new Date(
        birthYear as number,
        (month === '' ? 1 : month) - 1,
        day === '' ? 1 : day
      );
      setAge(calculateAge(birthDate));
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = validateDay(
      birthYear as number,
      birthMonth,
      parseInt(e.target.value, 10)
    );
    setBirthDay(day);
    if (birthYear !== '') {
      const month = birthMonth;
      const birthDate = new Date(
        birthYear as number,
        (month === '' ? 1 : month) - 1,
        day === '' ? 1 : day
      );
      setAge(calculateAge(birthDate));
    }
  };

  const handleEraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const era = e.target.value as Era;
    setSelectedEra(era);
  };

  const handleWarekiYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarekiYear(e.target.value === '' ? '' : parseInt(e.target.value, 10));
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
          placeholder="月"
        />
        <input
          type="number"
          value={birthDay}
          onChange={handleDayChange}
          placeholder="日"
        />
      </div>
      <div>
        <h3>和暦</h3>
        <select value={selectedEra} onChange={handleEraChange}>
          {eras.map((era) => (
            <option key={era} value={era}>
              {era}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={warekiYear}
          onChange={handleWarekiYearChange}
          placeholder="年"
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>年齢: {age}</p>
      <p>干支: {eto}</p>
    </div>
  );
};

export default AgeCalculator;
