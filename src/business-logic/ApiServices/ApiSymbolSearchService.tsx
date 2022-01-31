import axios from 'axios';

const ALPHAVANTAGE_API_KEY = 'XG02D1R55HHOXFYS';

interface ISymbolSearchResponse {
    "1. symbol": string,
    "2. name": string,
    "3. type": string,
    "4. region": string,
    "5. marketOpen": string,
    "6. marketClose": string,
    "7. timezone": string,
    "8. currency": string,
    "9. matchScore": string
}

const sanitizeSymbolSearchApiData = (bestMatches: Array<ISymbolSearchResponse>): string[] => {
    let results: string[] = [];

    console.log('bestMatches', bestMatches);
    results = bestMatches.map(
      (currMatch: ISymbolSearchResponse) => (
        `${currMatch['1. symbol']}; ${currMatch['2. name']}`
      )
    );

    return results;
};

const getSymbolSearchUrl = (keyword: string): string => {
    return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${ALPHAVANTAGE_API_KEY}`;
};

export const searchForSymbol = (keyword: string, resultsCallback: (results: string[]) => void): void => {
    axios.get(getSymbolSearchUrl(keyword))
    .then((res) => {
      if (res
        && res.data
        && res.data.bestMatches
        && res.data.bestMatches.length
        && res.data.bestMatches.length > 0) {
            resultsCallback(sanitizeSymbolSearchApiData(res.data.bestMatches));
      } else {
        throw new Error('Symbol search API response is in an unexpected format.');
      }
    })
    .catch((rawError) => {
        throw new Error(`Cannot load trivia questions: ${rawError}`);
      });
};
