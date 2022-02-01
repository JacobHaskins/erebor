import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IBoard, Board } from '../../models/Board';

interface IStockContext {
  boardState: IBoard;
  pinCardToBoard: (symbol: string) => void;
  resetCardByCardId: (cardId: string) => void;
}

const defaultState: IStockContext = {
  boardState: new Board(),
  pinCardToBoard: (symbol: string) => '',
  resetCardByCardId: (cardId: string) => ''
};

export const StockContext = createContext<IStockContext>(defaultState);

export const useStockContext = () => useContext(StockContext);

export type Props = {
  children: ReactNode
}

export const StockProvider = (props: Props) => {
  const { children } = props;

  const [ boardState, setBoardState ] = useState(new Board());

  const pinCardToBoard = (symbol: string): void => {
    symbol = symbol || '';
    let card0 = boardState.card0;
    let card1 = boardState.card1;
    let card2 = boardState.card2;

    if (!card0 || !card1 || !card2) {
      if (!card0) {
        card0 = symbol;
      } else if (!card1) {
        card1 = symbol;
      } else if (!card2) {
        card2 = symbol;
      }

      setBoardState(new Board(card0, card1, card2));
    }
  };

  const resetCardByCardId = (cardId: string): void => {
    const card0 = cardId === 'card0' ? '' : boardState.card0;
    const card1 = cardId === 'card1' ? '' : boardState.card1;
    const card2 = cardId === 'card2' ? '' : boardState.card2;
    setBoardState(new Board(card0, card1, card2));
  }

  return (
    <StockContext.Provider value={{ boardState, pinCardToBoard, resetCardByCardId }}>
      {children}
    </StockContext.Provider>
  );
};
