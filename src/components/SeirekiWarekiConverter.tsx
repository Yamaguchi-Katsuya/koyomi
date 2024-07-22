import React, { useState, ChangeEvent } from 'react';
import Circle from '../ui/Circle';
import { Era, eras } from '../types/era';
import {
  convertSeirekiToWareki,
  convertWarekiToSeireki,
} from '../utils/dateUtils';
import { validateWarekiYear } from '../utils/validation';
import Heading from '../ui/Heading';
import { BLACK, L_GRAY } from '../types/color';

function SeirekiWarekiConverter(): JSX.Element {
  const [outputWareki, setOutputWareki] = useState<string>('');
  const [selectedEra, setSelectedEra] = useState<Era>('令和');
  const [warekiYear, setWarekiYear] = useState<number>();
  const [outputSeireki, setOutputSeireki] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSeirekiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const year = Number(e.target.value);
    if (isNaN(year)) {
      setErrorMessage('西暦には数値を入力してください');
      return;
    }

    setOutputWareki(convertSeirekiToWareki(year));
  };

  const handleEraChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const era = e.target.value as Era;
    if (!eras.includes(era)) {
      setErrorMessage('不正な元号が選択されました');
      return;
    }

    setSelectedEra(era);
    validateAndSetWarekiYear(era, warekiYear);
  };

  const handleWarekiYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const year = Number(e.target.value);
    setWarekiYear(year);
    validateAndSetWarekiYear(selectedEra, year);
  };

  const validateAndSetWarekiYear = (era: Era, year: number | undefined) => {
    const validation = validateWarekiYear(era, year);
    if (!validation.valid) {
      setOutputSeireki(undefined);
      setErrorMessage(validation.message);
      return;
    }

    setErrorMessage('');
    setOutputSeireki(convertWarekiToSeireki(era, year as number));
  };

  return (
    <>
      <Circle bgColor={L_GRAY}>
        <Heading textColor={BLACK} text="YEAR" />
        <label htmlFor="seireki" className="font-kiwi">
          西暦から和暦へ
        </label>
        <div className="flex items-center gap-3 w-3/5 font-kiwi">
          <input
            type="number"
            id="seireki"
            onChange={handleSeirekiChange}
            className="rounded-md w-2/3 text-center"
          />
          <span>年</span>
        </div>
        <p className="font-kiwi">
          和暦 : <span>{outputWareki}</span>
        </p>
        <label htmlFor="wareki" className="font-kiwi">
          和暦から西暦へ
        </label>
        <div className="grid grid-cols-7 mx-auto gap-2 w-3/5 font-kiwi">
          <select
            id="wareki"
            className="rounded-md col-span-3 bg-white text-center"
            value={selectedEra}
            onChange={handleEraChange}
          >
            {eras.map((era) => (
              <option key={era} value={era}>
                {era}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="warekiYear"
            onChange={handleWarekiYearChange}
            className="rounded-md col-span-3 text-center"
          />
          <span className="col-span-1">年</span>
        </div>
        {errorMessage && (
          <p style={{ color: 'red' }} className="font-kiwi">
            {errorMessage}
          </p>
        )}
        <p className="font-kiwi">
          西暦 : <span>{outputSeireki ? `${outputSeireki}年` : ''}</span>
        </p>
      </Circle>
    </>
  );
}

export default SeirekiWarekiConverter;
