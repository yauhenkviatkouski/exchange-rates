import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import useCurrencyChart from '../../hooks/use-currency-chart';
import CurrencyChart from '../CurrencyChart';

jest.mock('../../hooks/use-currency-chart');
const mockUseCurrencyChart = useCurrencyChart as jest.MockedFunction<
  typeof useCurrencyChart
>;

jest.mock('../../components/Spinner');
const MockSpinner = Spinner as jest.MockedFunction<typeof Spinner>;

jest.mock('../../components/ErrorMessage');
const MockErrorMessage = ErrorMessage as jest.MockedFunction<
  typeof ErrorMessage
>;

describe('CurrencyChart', () => {
  const mockProps = {
    currency: 'EUR',
    startDate: new Date(),
    endDate: new Date(),
  };

  it('renders error text if hok returns error', async () => {
    mockUseCurrencyChart.mockImplementationOnce(() => ({
      loading: false,
      error: 'error text',
      data: null,
      currencySecond: 'USD',
      setCurrencySecond: () => {},
    }));
    MockErrorMessage.mockImplementationOnce(() => (
      <div data-testid="ErrorMessage-Component"></div>
    ));
    render(
      <CurrencyChart
        currency={mockProps.currency}
        startDate={mockProps.startDate}
        endDate={mockProps.endDate}
      />,
    );
    expect(screen.getByTestId(/ErrorMessage-Component/i)).toBeInTheDocument();
  });

  it('renders spinner while loading', async () => {
    mockUseCurrencyChart.mockImplementationOnce(() => ({
      loading: true,
      error: null,
      data: null,
      currencySecond: 'USD',
      setCurrencySecond: () => {},
    }));
    MockSpinner.mockImplementationOnce(() => (
      <div data-testid="Spinner-Component"></div>
    ));
    render(
      <CurrencyChart
        currency={mockProps.currency}
        startDate={mockProps.startDate}
        endDate={mockProps.endDate}
      />,
    );
    expect(screen.getByTestId(/Spinner-Component/i)).toBeInTheDocument();
  });

  it('renders chart currency list if there is data', async () => {
    mockUseCurrencyChart.mockImplementationOnce(() => ({
      loading: false,
      error: null,
      data: [
        {
          date: '',
          rate: '100',
        },
      ],
      currencySecond: 'USD',
      setCurrencySecond: () => {},
    }));

    render(
      <CurrencyChart
        currency={mockProps.currency}
        startDate={mockProps.startDate}
        endDate={mockProps.endDate}
      />,
    );
    expect(
      screen.getByTestId('CurrencyChart_currencyList'),
    ).toBeInTheDocument();
  });
});
