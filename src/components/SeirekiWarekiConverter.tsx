import React, { Component, ChangeEvent } from 'react';
import Circle from '../ui/Circle';
import { Era, eras } from '../types/era';
import {
  convertSeirekiToWareki,
  convertWarekiToSeireki,
} from '../utils/dateUtils';
import { validateWarekiYear } from '../utils/validation';
import Heading from '../ui/Heading';
import { BLACK, L_GRAY } from '../types/color';

interface State {
  seireki: number | '';
  wareki: string;
  selectedEra: Era;
  warekiYear: number | '';
  outputSeireki: number | '';
  errorMessage: string;
}

class SeirekiWarekiConverter extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      seireki: '',
      wareki: '',
      selectedEra: '令和',
      warekiYear: '',
      outputSeireki: '',
      errorMessage: '',
    };
  }

  handleSeirekiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10);
    this.setState({ seireki: e.target.value === '' ? '' : year });
    if (!isNaN(year)) {
      this.setState({ wareki: convertSeirekiToWareki(year) });
    } else {
      this.setState({ wareki: '' });
    }
  };

  handleEraChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const era = e.target.value as Era;
    this.setState({ selectedEra: era });
    this.validateAndSetWarekiYear(era, this.state.warekiYear);
  };

  handleWarekiYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value, 10);
    const yearValue = e.target.value === '' ? '' : year;
    this.setState({ warekiYear: yearValue });
    this.validateAndSetWarekiYear(this.state.selectedEra, yearValue);
  };

  validateAndSetWarekiYear = (era: Era, year: number | '') => {
    const validation = validateWarekiYear(era, year);
    if (validation.valid) {
      this.setState({ errorMessage: '' });
      if (year !== '') {
        const seirekiYear = convertWarekiToSeireki(era, year);
        this.setState({ outputSeireki: seirekiYear });
      } else {
        this.setState({ outputSeireki: '' });
      }
    } else {
      this.setState({ outputSeireki: '', errorMessage: validation.message });
    }
  };

  render() {
    const {
      seireki,
      wareki,
      selectedEra,
      warekiYear,
      outputSeireki,
      errorMessage,
    } = this.state;

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
              value={seireki}
              onChange={this.handleSeirekiChange}
              className="rounded-md w-2/3 text-center"
            />
            <span>年</span>
          </div>
          <p className="font-kiwi">
            和暦 : <span>{wareki}</span>
          </p>
          <label htmlFor="wareki" className="font-kiwi">
            和暦から西暦へ
          </label>
          <div className="grid grid-cols-7 mx-auto gap-2 w-3/5 font-kiwi">
            <select
              id="wareki"
              className="rounded-md col-span-3 bg-white text-center"
              value={selectedEra}
              onChange={this.handleEraChange}
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
              value={warekiYear}
              onChange={this.handleWarekiYearChange}
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
}

export default SeirekiWarekiConverter;
