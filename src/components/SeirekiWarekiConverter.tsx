import React, { useState } from 'react';
import Circle from '../ui/circle';
import { Era, eras } from '../types/era';
import {
    convertSeirekiToWareki,
    convertWarekiToSeireki,
} from '../utils/dateUtils';
import { validateWarekiYear } from '../utils/validation';
import Heading from '../ui/heading';
import { BLACK, L_GRAY } from '../types/color';

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
        <>
            <Circle bgColor={L_GRAY}>
                <Heading textColor={BLACK} text='YEAR' />
                <label
                    htmlFor='year'
                    className='font-kiwi'
                >
                    西暦から和暦へ
                </label>
                <div className='flex items-center gap-3 w-3/5 font-kiwi'>
                    <input
                        type="number"
                        value={seireki}
                        onChange={handleSeirekiChange}
                        className='rounded-md w-2/3'
                    />
                    <span>年</span>
                </div>
                <p className='font-kiwi'>
                    和暦 : <span>{wareki}</span>
                </p>
                <label
                    htmlFor='year'
                    className='font-kiwi'
                >
                    和暦から西暦へ
                </label>
                <div className='grid grid-cols-7 mx-auto gap-2 w-3/5 font-kiwi'>
                    <select className='rounded-md col-span-3 bg-white' value={selectedEra} onChange={handleEraChange}>
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
                        className='rounded-md col-span-3'
                    />
                    <span className='col-span-1'>年</span>
                </div>
                {errorMessage && <p style={{ color: 'red' }} className='font-kiwi'>{errorMessage}</p>}
                <p className='font-kiwi'>
                    西暦 : <span>{outputSeireki ? `${outputSeireki}年` : ''}</span>
                </p>
            </Circle>
        </>
    );
};

export default SeirekiWarekiConverter;
