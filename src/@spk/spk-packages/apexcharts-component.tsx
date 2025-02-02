import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexchartsComponentProps {
  chartOptions: ApexCharts.ApexOptions; 
  chartSeries: any; 
  height?: string | number; 
  width?: string | number; 
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'candlestick' | any;
}

const ApexchartsComponent: React.FC<ApexchartsComponentProps> = ({ chartOptions, chartSeries, height, width , type,}) => {

  return (
    <ReactApexChart options={chartOptions} series={chartSeries} height={height} width={width} type={type}/>
  );

};

export default ApexchartsComponent;
