export interface IBoard {
    card0: string;
    card1: string;
    card2: string;
}

export class Board {
    card0 = '';
    card1 = '';
    card2 = '';

    constructor(card0 = '', card1 = '', card2 = '') {
        this.card0 = card0;
        this.card1 = card1;
        this.card2 = card2;
    }
}
