import currencyApi from '../currencyApi';
import fetch from 'jest-fetch-mock';
fetch.enableMocks();

describe('getLatest()', () => {
  beforeEach(async function () {
    fetch.resetMocks();
  });

  it('returns latest rates', async () => {
    const mockedResponse = { rates: { USD: 1.12, GBP: 1.08 } };
    fetch.mockResponseOnce(JSON.stringify(mockedResponse));
    const result = await currencyApi.getLatest();
    expect(result.USD).toBe(mockedResponse.rates.USD);
  });

  it('throws error if response is not OK', async () => {
    fetch.mockResponseOnce('{}', {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
    await expect(currencyApi.getLatest()).rejects.toBeTruthy();
  });
});

describe('getTimeSeries', () => {
  beforeEach(async function () {
    fetch.resetMocks();
  });

  const mockedResponse = {
    rates: {
      '2022-01-01': {
        USD: 1.2,
      },
    },
  };

  it('returns array of rates', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockedResponse));
    const result = await currencyApi.getTimeSeries(
      'EUR',
      'USD',
      new Date(),
      new Date(),
    );
    expect(result[0].rate).toBe(mockedResponse.rates['2022-01-01'].USD);
  });

  it('fetch is calling with correct arguments', async () => {
    const startDateString = '2022-01-01';
    const secondDateString = '2022-01-02';
    const queryUrl =
      'https://api.exchangerate.host/timeseries?base=EUR&start_date=2022-01-01';

    fetch.mockResponseOnce(JSON.stringify(mockedResponse));
    const result = await currencyApi.getTimeSeries(
      'EUR',
      'USD',
      new Date(startDateString),
      new Date(),
    );
    expect(fetch.mock.calls[0][0]).toContain(queryUrl);
  });

  it('throws error if response is not OK', async () => {
    fetch.mockResponseOnce('{}', {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
    await expect(
      currencyApi.getTimeSeries('EUR', 'USD', new Date(), new Date()),
    ).rejects.toBeTruthy();
  });
});
