import { useEffect, useState } from 'react';
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
import Spinner from '../components/Spinner';
import constants from '../constants';
import currencyApi from '../services/currencyApi';

export type CurrencyChartProps = {
  currency: string;
  startDate: Date;
  endDate: Date;
};

function CurrencyChart(props: CurrencyChartProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ date: string; rate: string }[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [currencySecond, setCurrencySecond] = useState(
    props.currency === 'EUR' ? 'USD' : 'EUR',
  );

  useEffect(() => {
    async function downloadData() {
      const data = await currencyApi.getTimeSeries(
        props.currency,
        currencySecond,
        props.startDate,
        props.endDate,
      );
      const transformedData = data.map((item) => ({
        date: item.date.toLocaleDateString(),
        rate: item.rate.toFixed(4),
      }));
      setLoading(false);
      setData(transformedData);
    }

    downloadData().catch((e) => {
      setLoading(false);
      if (e instanceof Error && e.message) {
        setError(e.message);
      } else {
        setError('Something went wrong ¯\\_(ツ)_/¯');
      }
    });
  }, [currencySecond, props.currency, props.endDate, props.startDate]);

  if (error) {
    return <p>{error}</p>;
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
