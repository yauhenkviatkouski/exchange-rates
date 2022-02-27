import { useEffect, useState } from 'react';
import currencyApi from '../services/currencyApi';
import constants from '../constants';

type RatesResponse = { [key: string]: number };
type Currencies = { name: string; value: number };

function useCurrencyTable() {
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [converted, setConverted] = useState<Currencies[] | null>(null);

  function convertCurrencies(
    rates: { [currencyName: string]: number },
    currencyName: string = constants.DEFAULT_BASE_CURRENCY,
    currencyValue: number = constants.DEFAULT_BASE_CURRENCY_VALUE,
  ): Currencies[] {
    return constants.DEFAULT_CURRENCIES_LIST.map((name) => ({
      name: name,
      value:
        currencyName === name
          ? currencyValue
          : Number(
              ((currencyValue * rates[name]) / rates[currencyName]).toFixed(2),
            ),
    }));
  }

  function onChangeCurrencyValue(name: string, value: number) {
    rates && setConverted(convertCurrencies(rates, name, value));
  }

  useEffect(() => {
    setLoading(true);
    async function downloadLatestRates() {
      const rates = await currencyApi.getLatest();
      setLoading(false);
      setRates(rates);
      setConverted(convertCurrencies(rates));
    }
    downloadLatestRates().catch((e) => {
      setLoading(false);
      if (e instanceof Error && e.message) {
        setError(e.message);
      } else {
        setError('Something went wrong ¯\\_(ツ)_/¯');
      }
    });
  }, []);

  return {
    rates,
    loading,
    error,
    converted,
    onChangeCurrencyValue,
  };
}

export default useCurrencyTable;
