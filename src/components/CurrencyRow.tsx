import { useState } from 'react';
import constants from '../constants';
import CurrencyChart from '../containers/CurrencyChart';
import './CurrencyRow.css';
import Modal from './Modal';
import { ReactComponent as ChartIcon } from '../assets/icons/chart.svg';

type CurrencyRowProps = {
  name: string;
  value: number;
  onChangeValue: (currency: string, value: number) => void;
  onClickChartIcon?: () => void;
};

const CurrencyRow = (props: CurrencyRowProps) => {
  const [isChartDisplaying, setIsChartDisplaying] = useState(false);
  const endDateChart = new Date();
  const startDateChart = new Date(
    new Date().setDate(new Date().getDate() - 30),
  );

  function isValidInput(value: string) {
    return (
      value.length <= constants.MAX_CONVERTING_VALUE_LENGTH &&
      !isNaN(Number(value))
    );
  }

  return (
    <>
      {isChartDisplaying && (
        <Modal
          title={`${props.name} monthly chart`}
          onClose={() => setIsChartDisplaying(false)}
        >
          <CurrencyChart
            currency={props.name}
            startDate={startDateChart}
            endDate={endDateChart}
          />
        </Modal>
      )}
      <div className="CurrencyRow_Wrapper">
        <div className="CurrencyRow_FlagIcon">
          <img
            src={`https://flagcdn.com/h24/${props.name
              .slice(0, 2)
              .toLowerCase()}.png`}
            alt={props.name}
          />
        </div>

        <p className="CurrencyRow_Name">{props.name}</p>
        <input
          className="CurrencyRow_Input"
          onChange={(e) =>
            isValidInput(e.target.value) &&
            props.onChangeValue(props.name, Number(e.target.value))
          }
          type="text"
          value={props.value}
        />
        <button
          className="CurrencyRow_ChartButton"
          onClick={() => setIsChartDisplaying(true)}
        >
          <ChartIcon />
        </button>
      </div>
    </>
  );
};

export default CurrencyRow;
