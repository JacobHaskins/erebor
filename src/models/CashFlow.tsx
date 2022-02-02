export interface ICashFlow {
  date: string;
  value: number;
}

export class CashFlow {
  date = '';
  value = 0;

  constructor (date = '', value = 0) {
    this.date = date;
    this.value = value;
  }
}
