import { render, screen } from '@testing-library/react';
import CurrencyTableWrapper from '../../components/CurrencyTableWrapper';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import useCurrencyTable from '../../hooks/use-currency-table';
import CurrencyTable from '../CurrencyTable';

jest.mock('../../hooks/use-currency-table');
const mockUseCurrencyTable = useCurrencyTable as jest.MockedFunction<
  typeof useCurrencyTable
>;

jest.mock('../../components/Spinner');
const MockSpinner = Spinner as jest.MockedFunction<typeof Spinner>;

jest.mock('../../components/ErrorMessage');
const MockErrorMessage = ErrorMessage as jest.MockedFunction<
  typeof ErrorMessage
>;

jest.mock('../../components/CurrencyTableWrapper');
const MockCurrencyTableWrapper = CurrencyTableWrapper as jest.MockedFunction<
  typeof CurrencyTableWrapper
>;

describe('CurrencyChart', () => {
  const mockUseCurrencyChartResponse = {
    rates: { USD: 1, EUR: 1.2 },
    loading: false,
    error: 'ERROR TEXT',
    converted: [{ name: 'USD', value: 1 }],
    onChangeCurrencyValue: () => {},
  };

  it('renders error text if hok returns error', async () => {
    mockUseCurrencyTable.mockImplementationOnce(
      () => mockUseCurrencyChartResponse,
    );
    MockErrorMessage.mockImplementationOnce(() => (
      <div data-testid="ErrorMessage-Component"></div>
    ));
    render(<CurrencyTable />);
    expect(screen.getByTestId(/ErrorMessage-Component/i)).toBeInTheDocument();
  });

  it('renders spinner while loading', async () => {
    mockUseCurrencyChartResponse.loading = true;
    mockUseCurrencyTable.mockImplementationOnce(
      () => mockUseCurrencyChartResponse,
    );
    MockSpinner.mockImplementationOnce(() => (
      <div data-testid="Spinner-Component"></div>
    ));
    render(<CurrencyTable />);
    expect(screen.getByTestId(/Spinner-Component/i)).toBeInTheDocument();
  });

  it('renders table wrapper if there is data', async () => {
    mockUseCurrencyChartResponse.loading = false;
    mockUseCurrencyChartResponse.error = '';
    MockCurrencyTableWrapper.mockImplementationOnce(() => (
      <div data-testid="wrapper-testid"></div>
    ));
    mockUseCurrencyTable.mockImplementationOnce(
      () => mockUseCurrencyChartResponse,
    );

    render(<CurrencyTable />);
    expect(screen.getByTestId('wrapper-testid')).toBeInTheDocument();
  });
});
