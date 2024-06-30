import React, { useState } from 'react';
import {
  convertSeirekiToWareki,
  convertWarekiToSeireki,
} from '../utils/dateUtils';
import { validateWarekiYear } from '../utils/validation';
import { Era, eras } from '../types/era';

const SeirekiWarekiConverter: React.FC = () => {
  const [seireki, setSeireki] = useState<number | ''>('');
  const [wareki, setWareki] = useState<string>('');
  const [selectedEra, setSelectedEra] = useState<Era>('令和');
  const [warekiYear, setWarekiYear] = useState<number | ''>('');
  const [outputSeireki, setOutputSeireki] = useState<number | ''>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSeirekiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10);
    setSeireki(e.target.value === '' ? '' : year);
    if (!isNaN(year)) {
      setWareki(convertSeirekiToWareki(year));
    } else {
      setWareki('');
    }
  };

  const handleEraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const era = e.target.value as Era;
    setSelectedEra(era);
    validateAndSetWarekiYear(era, warekiYear);
  };

  const handleWarekiYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10);
    const yearValue = e.target.value === '' ? '' : year;
    setWarekiYear(yearValue);
    validateAndSetWarekiYear(selectedEra, yearValue);
  };

  const validateAndSetWarekiYear = (era: Era, year: number | '') => {
    const validation = validateWarekiYear(era, year);
    if (validation.valid) {
      setErrorMessage('');
      if (year !== '') {
        const seirekiYear = convertWarekiToSeireki(era, year);
        setOutputSeireki(seirekiYear);
      } else {
        setOutputSeireki('');
      }
    } else {
      setOutputSeireki('');
      setErrorMessage(validation.message);
    }
  };

  return (
    <div>
      <h2>西暦和暦変換</h2>
      <div>
        <input
          type="number"
          value={seireki}
          onChange={handleSeirekiChange}
          placeholder="西暦を入力"
        />
        <p>和暦: {wareki}</p>
      </div>
      <div>
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
          placeholder="年数を入力"
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <p>西暦: {outputSeireki}</p>
      </div>
    </div>
  );
};

export default SeirekiWarekiConverter;
