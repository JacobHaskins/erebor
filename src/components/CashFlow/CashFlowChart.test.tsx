import React from 'react';
import { render, act } from '@testing-library/react';
import CashFlowChart from './CashFlowChart';
import { axe, toHaveNoViolations } from "jest-axe";
import axios from 'axios';

expect.extend(toHaveNoViolations);

const mockJson = {
  data: {
    "symbol": "IBM",
    "annualReports": [
        {
            "fiscalDateEnding": "2020-12-31",
            "reportedCurrency": "USD",
            "operatingCashflow": "18197000000",
            "paymentsForOperatingActivities": "3406000000",
            "proceedsFromOperatingActivities": "None",
            "changeInOperatingLiabilities": "138000000",
            "changeInOperatingAssets": "-5088000000",
            "depreciationDepletionAndAmortization": "6695000000",
            "capitalExpenditures": "2618000000",
            "changeInReceivables": "-5297000000",
            "changeInInventory": "209000000",
            "profitLoss": "5590000000",
            "cashflowFromInvestment": "-3028000000",
            "cashflowFromFinancing": "-9721000000",
            "proceedsFromRepaymentsOfShortTermDebt": "-853000000",
            "paymentsForRepurchaseOfCommonStock": "None",
            "paymentsForRepurchaseOfEquity": "None",
            "paymentsForRepurchaseOfPreferredStock": "None",
            "dividendPayout": "5797000000",
            "dividendPayoutCommonStock": "5797000000",
            "dividendPayoutPreferredStock": "None",
            "proceedsFromIssuanceOfCommonStock": "None",
            "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet": "10504000000",
            "proceedsFromIssuanceOfPreferredStock": "None",
            "proceedsFromRepurchaseOfEquity": "-302000000",
            "proceedsFromSaleOfTreasuryStock": "None",
            "changeInCashAndCashEquivalents": "5448000000",
            "changeInExchangeRate": "None",
            "netIncome": "5590000000"
        },
        {
            "fiscalDateEnding": "2019-12-31",
            "reportedCurrency": "USD",
            "operatingCashflow": "14770000000",
            "paymentsForOperatingActivities": "3234000000",
            "proceedsFromOperatingActivities": "None",
            "changeInOperatingLiabilities": "-503000000",
            "changeInOperatingAssets": "-569000000",
            "depreciationDepletionAndAmortization": "6059000000",
            "capitalExpenditures": "2286000000",
            "changeInReceivables": "-502000000",
            "changeInInventory": "-67000000",
            "profitLoss": "9431000000",
            "cashflowFromInvestment": "-26936000000",
            "cashflowFromFinancing": "9042000000",
            "proceedsFromRepaymentsOfShortTermDebt": "-2597000000",
            "paymentsForRepurchaseOfCommonStock": "1361000000",
            "paymentsForRepurchaseOfEquity": "1361000000",
            "paymentsForRepurchaseOfPreferredStock": "None",
            "dividendPayout": "5707000000",
            "dividendPayoutCommonStock": "5707000000",
            "dividendPayoutPreferredStock": "None",
            "proceedsFromIssuanceOfCommonStock": "None",
            "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet": "31825000000",
            "proceedsFromIssuanceOfPreferredStock": "None",
            "proceedsFromRepurchaseOfEquity": "-1361000000",
            "proceedsFromSaleOfTreasuryStock": "None",
            "changeInCashAndCashEquivalents": "-3124000000",
            "changeInExchangeRate": "None",
            "netIncome": "9431000000"
        },
        {
            "fiscalDateEnding": "2018-12-31",
            "reportedCurrency": "USD",
            "operatingCashflow": "15247000000",
            "paymentsForOperatingActivities": "1423000000",
            "proceedsFromOperatingActivities": "None",
            "changeInOperatingLiabilities": "126000000",
            "changeInOperatingAssets": "-879000000",
            "depreciationDepletionAndAmortization": "4480000000",
            "capitalExpenditures": "3395000000",
            "changeInReceivables": "-1006000000",
            "changeInInventory": "127000000",
            "profitLoss": "8728000000",
            "cashflowFromInvestment": "-4913000000",
            "cashflowFromFinancing": "-10469000000",
            "proceedsFromRepaymentsOfShortTermDebt": "1341000000",
            "paymentsForRepurchaseOfCommonStock": "4443000000",
            "paymentsForRepurchaseOfEquity": "4443000000",
            "paymentsForRepurchaseOfPreferredStock": "None",
            "dividendPayout": "5666000000",
            "dividendPayoutCommonStock": "5666000000",
            "dividendPayoutPreferredStock": "None",
            "proceedsFromIssuanceOfCommonStock": "None",
            "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet": "6891000000",
            "proceedsFromIssuanceOfPreferredStock": "None",
            "proceedsFromRepurchaseOfEquity": "-4443000000",
            "proceedsFromSaleOfTreasuryStock": "None",
            "changeInCashAndCashEquivalents": "-135000000",
            "changeInExchangeRate": "None",
            "netIncome": "8728000000"
        }
    ]
  }
}


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// unit tests
test('should render cash flow component without exceptions', () => {
  mockedAxios.get.mockResolvedValue(mockJson);
  act(() => {
    render(<CashFlowChart symbol='F' currency='USD' />);
  });
});
