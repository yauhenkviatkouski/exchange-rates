import { useEffect, useState } from 'react';
import currencyApi from '../services/currencyApi';
import { CurrencyChartProps } from '../containers/CurrencyChart';

function useCurrencyChart(props: CurrencyChartProps) {
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

  return { loading, data, error, currencySecond, setCurrencySecond };
}

export default useCurrencyChart;
