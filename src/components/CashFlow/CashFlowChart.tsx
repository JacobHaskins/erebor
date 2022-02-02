import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { getCashFlowForSymbol } from '../../business-logic/ApiServices/ApiCashFlowService';
import { ICashFlow } from '../../models/CashFlow';
import './CashFlowChart.css';

interface ICashFlowProps {
  symbol: string;
  currency: string;
}

function CashFlowChart({ symbol, currency }: ICashFlowProps) {
  const [ cashFlowData, setCashFlowData ] = useState<ICashFlow[]>([]);
  const svgRef = useRef(null);

  const modifyCashFlow = (newCashFlowData: ICashFlow[]): void => {
    if(typeof setCashFlowData != 'undefined') {
      console.log('newCashFlowData', newCashFlowData);
      setCashFlowData(newCashFlowData);
    }
  };

  useEffect(() => {
    if (!symbol || !symbol.trim()) {
      setCashFlowData([]);
    } else {
      getCashFlowForSymbol(symbol.trim(), modifyCashFlow)
    }
  }, [symbol]);

  useEffect(() => {
    if (!cashFlowData.length || !svgRef.current) {
      return;
    }

    const MAX_WIDTH = 250;
    const MAX_HEIGHT = 250;
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 60, left: 100 },
        width = MAX_WIDTH - margin.left - margin.right,
        height = MAX_HEIGHT - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis and Y axis
    const x = d3.scaleBand().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(cashFlowData.map((d) => d.date) || []);

    let yMin: number = cashFlowData[0].value;
    let yMax: number = cashFlowData[0].value;
    for(let i = 1; i < cashFlowData.length; i++) {
      yMin = (cashFlowData[i].value < yMin) ? cashFlowData[i].value : yMin;
      yMax = (cashFlowData[i].value > yMax) ? cashFlowData[i].value : yMax;
    }
    y.domain([yMin, yMax]);

    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x)/*.tickFormat((d) => '')*/)
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

    svg.append("g")
    .call(d3.axisLeft(y)/*.tickFormat((d) => '')*/);

    const lineGenerator = d3.line<ICashFlow>()
      .x((d) => { return x((d as unknown as ICashFlow).date) || 0; })
      .y((d) => { return y((d as unknown as ICashFlow).value); });

    svg.append("path")
      .datum(cashFlowData)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator)
  }, [cashFlowData, svgRef.current]);

  if (!symbol || !symbol.trim() || !cashFlowData.length ) {
    return null;
  }

  return (
    <div className='chart-wrapper'>
      <p>Cash flow chart, { currency } by fiscal end date. 
      <br/> 
      Most recent year (ending { cashFlowData[cashFlowData.length - 1].date }) cash flow is { currency }{ cashFlowData[cashFlowData.length - 1].value }.
      </p>
    <svg ref={ svgRef }></svg>
    </div>
  );
/*
  return (
    <p>chart</p>
  );
*/
}

export default CashFlowChart;
