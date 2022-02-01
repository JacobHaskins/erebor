
export interface ICard {
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
  "Currency": string;
  "Price": string;
  "ChangePercent": string;
}

export class Card {
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
  Currency = '';
  Price = '';
  ChangePercent = '';
}
