import axios from 'axios';

const ALPHAVANTAGE_API_KEY = 'XG02D1R55HHOXFYS';

interface IOverviewResponse {
  "Symbol": string;
  "AssetType": string;
  "Name": string;
  "Description": string;
  "CIK": string;
  "Exchange": string;
  "Currency": string;
  "Country": string;
  "Sector": string;
  "Industry": string;
  "Address": string;
  "FiscalYearEnd": string;
  "LatestQuarter": string;
  "MarketCapitalization": string;
  "EBITDA": string;
  "PERatio": string;
  "PEGRatio": string;
  "BookValue": string;
  "DividendPerShare": string;
  "DividendYield": string;
  "EPS": string;
  "RevenuePerShareTTM": string;
  "ProfitMargin": string;
  "OperatingMarginTTM": string;
  "ReturnOnAssetsTTM": string;
  "ReturnOnEquityTTM": string;
  "RevenueTTM": string;
  "GrossProfitTTM": string;
  "DilutedEPSTTM": string;
  "QuarterlyEarningsGrowthYOY": string;
  "QuarterlyRevenueGrowthYOY": string;
  "AnalystTargetPrice": string;
  "TrailingPE": string;
  "ForwardPE": string;
  "PriceToSalesRatioTTM": string;
  "PriceToBookRatio": string;
  "EVToRevenue": string;
  "EVToEBITDA": string;
  "Beta": string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  "SharesOutstanding": string;
  "DividendDate": string;
  "ExDividendDate": string;
}

interface IStockQuoteData {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

export interface IStockCardData {
  "Symbol": string;
  "Name": string;
  "EBITDA": string;
  "PERatio": string;
  "PEGRatio": string;
  "BookValue": string;
  "DividendPerShare": string;
  "DividendYield": string;
  "EPS": string;
  "High52Week": string;
  "Low52Week": string;
  "Price": string;
  "ChangePercent": string;
}

export class StockStatsData {
  Symbol = '';
  Name = '';
  EBITDA = '';
  PERatio = '';
  PEGRatio = '';
  BookValue = '';
  DividendPerShare = '';
  DividendYield = '';
  EPS = '';
  High52Week = '';
  Low52Week = '';
  Price = '';
  ChangePercent = '';
}

const sanitizeStockOverviewApiData = (partialStockStats: IStockCardData, overviewData: IOverviewResponse): IStockCardData => {
  partialStockStats.Symbol = overviewData.Symbol || '';
  partialStockStats.Name = overviewData.Name || '';
  partialStockStats.EBITDA = overviewData.EBITDA || '';
  partialStockStats.PERatio = overviewData.PERatio || '';
  partialStockStats.PEGRatio = overviewData.PEGRatio || '';
  partialStockStats.BookValue = overviewData.BookValue || '';
  partialStockStats.DividendPerShare = overviewData.DividendPerShare || '';
  partialStockStats.DividendYield = overviewData.DividendYield || '';
  partialStockStats.EPS = overviewData.EPS || '';
  partialStockStats.High52Week = overviewData['52WeekHigh'] || '';
  partialStockStats.Low52Week = overviewData['52WeekLow'] || '';

  return partialStockStats;
};

const sanitizeStockQuoteApiData = (partialStockStats: IStockCardData, quoteData: IStockQuoteData): IStockCardData => {
  partialStockStats.Price = quoteData['05. price'] || '';
  partialStockStats.ChangePercent = quoteData['10. change percent'] || '';

  return partialStockStats;
};

const getStockOverviewUrl = (symbol: string): string => {
  return `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
};

const getStockQuoteUrl = (symbol: string): string => {
  return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
};

export const getStockDataForSymbol = (symbol: string, resultsCallback: (results: IStockCardData) => void): void => {
  axios.get(getStockOverviewUrl(symbol))
  .then((res) => {
    if (res
      && res.data
      && res.data.Symbol) {
        return sanitizeStockOverviewApiData(new StockStatsData(), res.data);
    }

    throw new Error(`Stock overview API response is in an unexpected format.  Details: ${res.data.Note}`);
  }).then((partialStockStatsData) => {
    axios.get(getStockQuoteUrl(symbol))
    .then((res) => {
      if (res
        && res.data
        && res.data['Global Quote']
        && res.data['Global Quote']['01. symbol']) {
          resultsCallback(sanitizeStockQuoteApiData(partialStockStatsData, res.data['Global Quote']));
      } else {
        throw new Error(`Stock quote API response is in an unexpected format.  Details: ${res.data.Note}`);
      }
    })
  })
  .catch((rawError) => {
    alert(`Cannot load search results: ${rawError}`); // IDEA: do something better than an alert with the errors
  });
};
