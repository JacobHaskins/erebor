import axios from 'axios';
import { IDailyPrice } from '../../models/DailyPrice';
import ALPHAVANTAGE_API_KEY from '../../settings/prod'; 


const sanitizeDailyPricesApiData = (dailyPricesData: any): IDailyPrice[] => {
  let results: any[] = [];
  const keys = Object.keys(dailyPricesData);
  if (!keys.length) {
    return results;
  }

  results = keys.map((key: string) => {
    let closePrice = Number(dailyPricesData[key]['4. close'] || '0');
    closePrice = isNaN(closePrice) ? 0 : closePrice;

    return {
      name: key,
      value: closePrice
    }
  });

  return results;
};

const getDailyPricesUrl = (symbol: string): string => {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
};

export const getDailyPricesForSymbol = (symbol: string, resultsCallback: (results: IDailyPrice[]) => void): void => {
  axios.get(getDailyPricesUrl(symbol))
  .then((res) => {
    if (res
      && res.data
      && res.data['Time Series (Daily)']) {
        return resultsCallback(sanitizeDailyPricesApiData(res.data['Time Series (Daily)']));
    }

    throw new Error(`Stock overview API response is in an unexpected format.  Details: ${res.data.Note}`);
  })
  .catch((rawError) => {
    alert(`Cannot load search results: ${rawError}`); // IDEA: do something better than an alert with the errors
  });
};
