import constants from '../constants';

const BASE_URL = 'https://api.exchangerate.host';

type LatestRates = { [currencyName: string]: number };

async function getLatest(): Promise<LatestRates> {
  const response = await fetch(
    BASE_URL + `/latest?base=${constants.DEFAULT_BASE_CURRENCY}`,
  );
  checkIfError(response);
  const parsedResponse = await response.json();
  return parsedResponse.rates;
}

async function getTimeSeries(
  currencyFirst: string,
  currencySecond: string,
  startDate: Date,
  endDate: Date,
): Promise<{ date: Date; rate: number }[]> {
  const start = dateToString(startDate);
  const end = dateToString(endDate);
  const response = await fetch(
    BASE_URL +
      `/timeseries?base=${currencyFirst}&start_date=${start}&end_date=${end}`,
  );
  checkIfError(response);
  const { rates } = await response.json();
  return Object.keys(rates).map((date) => ({
    date: new Date(date),
    rate: rates[date][currencySecond],
  }));
}
function checkIfError(response: Response) {
  if (!response.ok) {
    throw new Error('Error while loading data from api.exchangerate.host');
  }
}

function dateToString(date: Date) {
  const year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  return `${year}-${month.length > 1 ? month : '0' + month}-${
    day.length > 1 ? day : '0' + day
  }`;
}

const currencyApi = {
  getLatest,
  getTimeSeries,
};

export default currencyApi;
