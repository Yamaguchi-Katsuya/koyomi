import React, { Component, ChangeEvent } from 'react';
import { handleDateChange } from '../utils/dateUtils';
import { Eto } from '../types/eto';
import { Holiday } from '../types/holiday';
import Heading from '../ui/Heading';
import { D_GRAY, L_GRAY, WHITE } from '../types/color';
import SectionLayout from '../layout/SectionLayout';
import Circle from '../ui/Circle';

interface State {
  inputBirthYear: number | '';
  inputBirthMonth: number | '';
  inputBirthDay: number | '';
  birthYear: number | '';
  birthMonth: number | '';
  birthDay: number | '';
  age: number | '';
  eto: Eto | '';
  errorMessage: string;
  holidays: Holiday[];
  isResultReady: boolean;
}

class AgeCalculator extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputBirthYear: '',
      inputBirthMonth: '',
      inputBirthDay: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      age: '',
      eto: '',
      errorMessage: '',
      holidays: [],
      isResultReady: false,
    };
  }

  handleInputYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputBirthYear: parseInt(e.target.value, 10) });
  };

  handleInputMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputBirthMonth: parseInt(e.target.value, 10) });
  };

  handleInputDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputBirthDay: parseInt(e.target.value, 10) });
  };

  handleGoClick = () => {
    const { inputBirthYear, inputBirthMonth, inputBirthDay } = this.state;

    this.setState({
      birthYear: inputBirthYear,
      birthMonth: inputBirthMonth,
      birthDay: inputBirthDay,
    });

    handleDateChange(
      inputBirthYear,
      inputBirthMonth,
      inputBirthDay,
      (age) => this.setState({ age }),
      (eto) => this.setState({ eto }),
      (holidays) => this.setState({ holidays }),
      (errorMessage) => this.setState({ errorMessage })
    );

    this.setState({ isResultReady: true });

    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  render() {
    const {
      inputBirthYear,
      inputBirthMonth,
      inputBirthDay,
      birthYear,
      birthMonth,
      birthDay,
      age,
      eto,
      errorMessage,
      holidays,
      isResultReady,
    } = this.state;

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
            <div className="grid grid-cols-11 w-3/4 mb-2 md:mb-0 text-white font-kiwi">
              <input
                type="number"
                name="year"
                value={inputBirthYear}
                onChange={this.handleInputYearChange}
                className="border border-gray-400 rounded-md col-span-4 text-black"
              />
              <span className="col-span-1">年</span>
              <input
                type="number"
                name="month"
                value={inputBirthMonth}
                onChange={this.handleInputMonthChange}
                max={12}
                className="border border-gray-400 rounded-md col-span-2 text-black"
              />
              <span className="col-span-1">月</span>
              <input
                type="number"
                name="day"
                value={inputBirthDay}
                onChange={this.handleInputDayChange}
                max={31}
                className="border border-gray-400 rounded-md col-span-2 text-black"
              />
              <span className="col-span-1">日</span>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button
              className="bg-l-gray text-white font-mono rounded-full py-1 px-6 md:py-2 md:px-12"
              onClick={this.handleGoClick}
            >
              GO
            </button>
          </Circle>
        </SectionLayout>
        {isResultReady && (
          <SectionLayout bgColor={WHITE}>
            <Circle bgColor={L_GRAY} className="mt-4 md:mt-8 font-kiwi">
              <p className="md:text-4xl font-bold">
                {birthYear ? `${birthYear}年` : ''}
                {birthMonth ? `${birthMonth}月` : ''}
                {birthDay ? `${birthDay}日` : ''}
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
}

export default AgeCalculator;
