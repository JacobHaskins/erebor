import axios from 'axios';

const ALPHAVANTAGE_API_KEY = 'XG02D1R55HHOXFYS';

interface IKeywordSearchResponse {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
}

const sanitizeKeywordSearchApiData = (bestMatches: Array<IKeywordSearchResponse>): string[] => {
    let results: string[] = [];

    const MAX_NAME_LENGTH = 45;
    results = bestMatches.map(
      (currMatch: IKeywordSearchResponse) => {
        let rawResult = `${ currMatch['1. symbol'] }; ${ currMatch['2. name'] }`; 
        rawResult = rawResult.length <= MAX_NAME_LENGTH 
          ? rawResult 
          : `${rawResult.substring(0, MAX_NAME_LENGTH - 1)}...`;

        return rawResult;
      }
    );

    return results;
};

const getKeywordSearchUrl = (keyword: string): string => {
    return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${ALPHAVANTAGE_API_KEY}`;
};

export const searchForKeyword = (keyword: string, resultsCallback: (results: string[]) => void): void => {
    axios.get(getKeywordSearchUrl(keyword))
    .then((res) => {
      if (res
        && res.data
        && res.data.bestMatches
        && res.data.bestMatches.length
        && res.data.bestMatches.length > 0) {
            resultsCallback(sanitizeKeywordSearchApiData(res.data.bestMatches));
      } else {
        throw new Error('Symbol search API response is in an unexpected format.');
      }
    })
    .catch((rawError) => {
        throw new Error(`Cannot load search results: ${rawError}`);
      });
};
