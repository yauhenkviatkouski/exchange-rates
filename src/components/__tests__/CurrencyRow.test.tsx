import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyRow from '../CurrencyRow';

describe('CurrencyRow', () => {
  it('renders a CurrencyRow with currency name', async () => {
    render(<CurrencyRow name="EUR" value={200} onChangeValue={() => {}} />);
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });

  it('renders currency chart by clicking chartButton', async () => {
    render(<CurrencyRow name="EUR" value={200} onChangeValue={() => {}} />);
    const chartButton = screen.getByRole('button');
    fireEvent.click(chartButton);
    expect(screen.getByText('EUR monthly chart')).toBeInTheDocument();
  });
});
