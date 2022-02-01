import React, { useEffect, useState } from 'react';
import { getDailyPricesForSymbol } from '../../business-logic/ApiServices/ApiDailyPricesService';
import { ICard, Card } from "../../models/Card";
import { IDailyPrice, DailyPrice } from '../../models/DailyPrice';
import './DailyPrices.css';

interface IDailyPricesProps {
  symbol: string;
}

function DailyPrices({ symbol }: IDailyPricesProps) {
  const [ dailyPricesData, setDailyPricesData ] = useState<IDailyPrice[]>([]);

  const modifyDailyPrices = (newDailyPricesData: IDailyPrice[]): void => {
    if(typeof setDailyPricesData != 'undefined') {
      console.log('newDailyPriceData', newDailyPricesData);
      setDailyPricesData(newDailyPricesData);
    }
  };

  useEffect(() => {
    if (!symbol || !symbol.trim()) {
      setDailyPricesData([]);
    } else {
      getDailyPricesForSymbol(symbol.trim(), modifyDailyPrices)
    }
  }, [symbol]);

  if (!symbol || !symbol.trim() || !dailyPricesData.length ) {
    return null;
  }

  return (
    <p>chart</p>
  );
}

export default DailyPrices;
