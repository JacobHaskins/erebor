export interface IBoard {
    0: string,
    1: string,
    2: string
}

export class Board {
    0 = 'IBM';
    1 = 'AGNC';
    2 = 'PLTR';
}

export const board: IBoard = new Board();
