import React from 'react';
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from "react-chartjs-2";

interface ChartJsComponentProps {
  chartOptions: any;
  chartSeries: any;
  height?: string | number;
  width?: string | number;
  id?: string;
  type: 'line' | 'bar' | 'pie' | 'bubble' | 'scatter' | 'radar' | 'doughnut' | 'polarArea';
}

const SpkChartJs: React.FC<ChartJsComponentProps> = ({ chartOptions, chartSeries, height, width, type, id }) => {

  const renderChart = () => {

    switch (type) {
      case 'line':
        return <Line id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      case 'bar':
        return <Bar id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      case 'pie':
        return <Pie id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      case 'bubble':
        return <Bubble id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      case 'scatter':
        return <Scatter id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      case 'radar':
        return <Radar id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      case 'doughnut':
        return <Doughnut id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      case 'polarArea':
        return <PolarArea id={id} options={chartOptions} data={chartSeries} height={height} width={width} />;

      default:
        return null; // Handle unexpected chart types
    }
  };

  return <>{renderChart()}</>;

};

export default SpkChartJs;
