import axios from 'axios';
import { CashFlow, ICashFlow } from '../../models/CashFlow';
import ALPHAVANTAGE_API_KEY from '../../settings/prod'; 

interface IRawCashFlowData {
  "fiscalDateEnding": string;
  "reportedCurrency": string;
  "operatingCashflow": string;
  "paymentsForOperatingActivities": string;
  "proceedsFromOperatingActivities": string;
  "changeInOperatingLiabilities": string;
  "changeInOperatingAssets": string;
  "depreciationDepletionAndAmortization": string;
  "capitalExpenditures": string;
  "changeInReceivables": string;
  "changeInInventory": string;
  "profitLoss": string;
  "cashflowFromInvestment": string;
  "cashflowFromFinancing": string;
  "proceedsFromRepaymentsOfShortTermDebt": string;
  "paymentsForRepurchaseOfCommonStock": string;
  "paymentsForRepurchaseOfEquity": string;
  "paymentsForRepurchaseOfPreferredStock": string;
  "dividendPayout": string;
  "dividendPayoutCommonStock": string;
  "dividendPayoutPreferredStock": string;
  "proceedsFromIssuanceOfCommonStock": string;
  "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet": string;
  "proceedsFromIssuanceOfPreferredStock": string;
  "proceedsFromRepurchaseOfEquity": string;
  "proceedsFromSaleOfTreasuryStock": string;
  "changeInCashAndCashEquivalents": string;
  "changeInExchangeRate": string;
  "netIncome": string;
}

const sanitizeCashFlowApiData = (cashFlowData: IRawCashFlowData[]): ICashFlow[] => {
  const results: ICashFlow[] = [];
  // make the data ascend to the most recent data - it is supplied in descending order that starts with the most recent date
  for(let i = cashFlowData.length - 1; i >= 0; i--) {
    let cashFlow = Number(cashFlowData[i].operatingCashflow || '0');
    cashFlow = isNaN(cashFlow) ? 0 : cashFlow;

    results.push(new CashFlow(cashFlowData[i].fiscalDateEnding, cashFlow));
  }

  return results;
};

const getCashFlowUrl = (symbol: string): string => {
  return `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
};

export const getCashFlowForSymbol = (symbol: string, resultsCallback: (results: ICashFlow[]) => void): void => {
  axios.get(getCashFlowUrl(symbol))
  .then((res) => {
    if (res
      && res.data
      && res.data['annualReports']) {
        return resultsCallback(sanitizeCashFlowApiData(res.data['annualReports']));
    }

    throw new Error(`Stock overview API response is in an unexpected format.  Details: ${res.data.Note}`);
  })
  .catch((rawError) => {
    alert(`Cannot load search results: ${rawError}`); // IDEA: do something better than an alert with the errors
  });
};
