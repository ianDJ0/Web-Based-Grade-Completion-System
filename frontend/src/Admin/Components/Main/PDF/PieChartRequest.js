import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Report.css";

const PieChartRequest = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  return (
    <div id="request-pie-chart">
      <Pie data={props.state} options={props.options} />
    </div>
  );
};

export default PieChartRequest;
