import React from 'react';
import './StockCard.css';

interface IStockCardProps {
  title: string
}

function StockCard({ title }: IStockCardProps) {
  return (
    <section className="stock-card">
      <p>{ title }</p>
      <p className="grey-text">
        Pick an additional stock symbol in the search box above to display stock information
      </p>
    </section>
  );
}

export default StockCard;
