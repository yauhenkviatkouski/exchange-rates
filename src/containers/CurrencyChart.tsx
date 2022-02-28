import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import constants from '../constants';
import useCurrencyChart from '../hooks/use-currency-chart';

export type CurrencyChartProps = {
  currency: string;
  startDate: Date;
  endDate: Date;
};

function CurrencyChart(props: CurrencyChartProps) {
  const { loading, error, data, currencySecond, setCurrencySecond } =
    useCurrencyChart(props);

  if (error) {
    return <ErrorMessage errorText={error} />;
  }
  if (loading && !error) {
    return <Spinner />;
  }
  return (
    data && (
      <>
        <div>
          <label htmlFor="currencyList">Choose a pair currency: </label>
          <select
            value={currencySecond}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCurrencySecond(e.target.value)
            }
            id="currencyList"
            data-testid="CurrencyChart_currencyList"
          >
            {constants.DEFAULT_CURRENCIES_LIST.filter(
              (cur) => cur !== props.currency,
            ).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <br></br>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            width={280}
            height={300}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              dataKey="rate"
              type="number"
              domain={[
                (dataMin: string) => dataMin,
                (dataMax: string) => dataMax,
              ]}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </>
    )
  );
}

export default CurrencyChart;
