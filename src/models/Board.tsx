export interface IBoard {
    card0: string,
    card1: string,
    card2: string,
}

export class Board {
    card0 = 'IBM';
    card1 = 'AGNC';
    card2 = 'PLTR';
}

export const board: IBoard = new Board();
