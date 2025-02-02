import React from 'react';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

interface EchartsComponentProps {
  chartOptions: EChartsOption;
  chartSeries: Array<any>;
  height?: string | number;
  width?: string | number;
  mainClass?: string;
  id?: any;
}

const SpkEcharts: React.FC<EchartsComponentProps> = ({ chartOptions, chartSeries, mainClass, height, width, id }) => {

  return (
    // <div id={id} >
        <ReactECharts option={{ ...chartOptions, series: chartSeries }} style={{ height, width }} key={id}  className={mainClass}  />
    // </div>
  );

};

export default SpkEcharts;
