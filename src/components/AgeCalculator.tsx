import React, { useState, useEffect } from 'react';
import Circle from '../ui/circle';
import { handleDateChange } from '../utils/dateUtils';
import { Eto } from '../types/eto';
import { Holiday } from '../types/holiday';
import Heading from '../ui/heading';
import { D_GRAY, L_GRAY } from '../types/color';

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
    const [isMoreClicked, setIsMoreClicked] = useState<boolean>(false);

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
        setIsMoreClicked(false);
    };

    return (
        <>
            <Heading textColor={D_GRAY} text='DATE' />
            <Circle bgColor={D_GRAY}>
                <p className='text-white leading-7 md:leading-10'>
                    今日はなんの日？<br />
                    干支・星座・年齢を調べてみよう！
                </p>
                <div className="flex space-x-2 items-center">
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={inputBirthYear}
                            onChange={handleInputYearChange}
                            className="border border-gray-400 p-2 rounded-lg w-16"
                        />
                        <span className="ml-1">年</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={inputBirthMonth}
                            onChange={handleInputMonthChange}
                            max={12}
                            className="border border-gray-400 p-2 rounded-lg w-16"
                        />
                        <span className="ml-1">月</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={inputBirthDay}
                            onChange={handleInputDayChange}
                            max={31}
                            className="border border-gray-400 p-2 rounded-lg w-16"
                        />
                        <span className="ml-1">日</span>
                    </div>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button
                    className='bg-l-gray text-white font-kiwi rounded-full py-2 px-4'
                    onClick={handleGoClick}
                >
                    GO
                </button>
            </Circle>
            {isResultReady && (
                <Circle bgColor={L_GRAY}>
                    <p>
                        <span>{birthYear ? `${birthYear}年` : ''}{birthMonth ? `${birthMonth}月` : ''}{birthDay ? `${birthDay}日` : ''}</span><br />
                        <span>{eto}　{age ? `${age}歳` : ''}</span>
                    </p>
                    <p>
                        <span>{holidays[0]?.name}</span><br />
                        <span>
                            {holidays[0]?.description}
                        </span>
                    </p>
                    <button
                        className='bg-black text-white font-kiwi rounded-full px-4 py-2'
                        onClick={() => setIsMoreClicked(true)}
                    >
                        MORE
                    </button>
                </Circle>
            )}
            {isMoreClicked && (
                <>
                    <Circle bgColor={L_GRAY}>
                        <p>
                            <span>{holidays[1]?.name}</span><br />
                            <span>
                                {holidays[1]?.description}
                            </span>
                        </p>
                        <p>
                            <span>{holidays[2]?.name}</span><br />
                            <span>
                                {holidays[2]?.description}
                            </span>
                        </p>
                    </Circle>
                    <Circle bgColor={L_GRAY}>
                        <p>
                            <span>{holidays[3]?.name}</span><br />
                            <span>
                                {holidays[3]?.description}
                            </span>
                        </p>
                        <p>
                            <span>{holidays[4]?.name}</span><br />
                            <span>
                                {holidays[4]?.description}
                            </span>
                        </p>
                    </Circle>
                </>
            )}
        </>
    );
};

export default AgeCalculator;
