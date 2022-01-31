import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IBoard, Board, board } from '../../models/Board';

interface IStockContext {
  boardState: IBoard;
}

const defaultState = {
  boardState: new Board()
};

export const StockContext = createContext<IStockContext>(defaultState);

export const useStockContext = () => useContext(StockContext);

export type Props = {
  children: ReactNode
}

export const StockProvider = (props: Props) => {
  const { children } = props;

  const [ boardState ] = useState(board);

  return (
    <StockContext.Provider value={{ boardState }}>
      {children}
    </StockContext.Provider>
  );
};
