import CurrencyRow from '../components/CurrencyRow';
import CurrencyTableWrapper from '../components/CurrencyTableWrapper';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import useCurrencyTable from '../hooks/use-currency-table';

const CurrencyTable = () => {
  const { rates, loading, error, converted, onChangeCurrencyValue } =
    useCurrencyTable();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage errorText={error} />;
  }

  return (
    <>
      <CurrencyTableWrapper>
        {converted &&
          rates &&
          converted.map((currency) => (
            <CurrencyRow
              key={currency.name}
              value={currency.value}
              name={currency.name}
              onChangeValue={onChangeCurrencyValue}
            />
          ))}
      </CurrencyTableWrapper>
    </>
  );
};

export default CurrencyTable;
