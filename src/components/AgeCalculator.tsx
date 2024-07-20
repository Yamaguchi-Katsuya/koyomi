import React, { useState, useEffect } from 'react';
import Circle from '../ui/circle';
import { handleDateChange } from '../utils/dateUtils';
import { Eto } from '../types/eto';
import { Holiday } from '../types/holiday';
import Heading from '../ui/heading';
import { D_GRAY, L_GRAY, WHITE } from '../types/color';
import SectionLayout from '../ui/layout/sectionLayout';

const AgeCalculator: React.FC = () => {
    const [inputBirthYear, setInputBirthYear] = useState<number | ''>('');
    const [inputBirthMonth, setInputBirthMonth] = useState<number | ''>('');
    const [inputBirthDay, setInputBirthDay] = useState<number | ''>('');
    const [birthYear, setBirthYear] = useState<number | ''>('');
    const [birthMonth, setBirthMonth] = useState<number | ''>('');
    const [birthDay, setBirthDay] = useState<number | ''>('');
    const [age, setAge] = useState<number | ''>('');
    const [eto, setEto] = useState<Eto | ''>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [isResultReady, setIsResultReady] = useState<boolean>(false);

    const handleInputYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputBirthYear(parseInt(e.target.value, 10));
    };

    const handleInputMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputBirthMonth(parseInt(e.target.value, 10));
    };

    const handleInputDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputBirthDay(parseInt(e.target.value, 10));
    };

    const handleGoClick = () => {
        setBirthYear(inputBirthYear);
        setBirthMonth(inputBirthMonth);
        setBirthDay(inputBirthDay);
        handleDateChange(
            inputBirthYear,
            inputBirthMonth,
            inputBirthDay,
            setAge,
            setEto,
            setHolidays,
            setErrorMessage
        );
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
                    <Heading textColor={WHITE} text='DATE' />
                    <p className='text-white'>
                        今日は何の日？<br />
                        干支・星座・年齢を調べてみよう！
                    </p>
                    <div className="grid grid-cols-11 w-3/4 mb-2 md:mb-0">
                        <input
                            type="number"
                            value={inputBirthYear}
                            onChange={handleInputYearChange}
                            className="border border-gray-400 rounded-md col-span-4"
                        />
                        <span className='col-span-1'>年</span>
                        <input
                            type="number"
                            value={inputBirthMonth}
                            onChange={handleInputMonthChange}
                            max={12}
                            className="border border-gray-400 rounded-md col-span-2"
                        />
                        <span className='col-span-1'>月</span>
                        <input
                            type="number"
                            value={inputBirthDay}
                            onChange={handleInputDayChange}
                            max={31}
                            className="border border-gray-400 rounded-md col-span-2"
                        />
                        <span className='col-span-1'>日</span>
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button
                        className='bg-l-gray text-white font-kiwi rounded-full py-1 px-6 md:py-2 md:px-12'
                        onClick={handleGoClick}
                    >
                        GO
                    </button>
                </Circle>
            </SectionLayout>
            {isResultReady && (
                <SectionLayout bgColor={WHITE}>
                    <Circle bgColor={L_GRAY} className="mt-4 md:mt-8">
                        <p className='md:text-4xl font-bold'>{birthYear ? `${birthYear}年` : ''}{birthMonth ? `${birthMonth}月` : ''}{birthDay ? `${birthDay}日` : ''}</p>
                        <p className='md:text-4xl font-bold'>{eto}　{age ? `${age}歳` : ''}</p>
                        <div className='w-5/6 md:text-4xl flex flex-col items-center gap-3 md:gap-6'>
                            <p className='font-bold'>{holidays[0]?.name}</p>
                            <p>
                                {holidays[0]?.description}
                            </p>
                        </div>
                    </Circle>
                </SectionLayout>
            )}
        </>
    );
};

export default AgeCalculator;
