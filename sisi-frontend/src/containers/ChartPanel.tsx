import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../redux/store";
import { useQuery } from "@apollo/react-hooks";

import {
  GET_NEWREPORTSDATA,
  GET_NEWREPORTSPERCENTAGECHANGEDATA,
} from "../resolvers";

import { setNewReports, setNewReportsPC } from "../features/charts/chartsSlice";

import Chart from "../components/Chart.jsx";
import AverageButtons from "../components/AverageButtons";

import Legend from "../components/Legend";

import MetricButtons from "../components/MetricButtons";

import "../App.css";
import KPI from "../components/KPI";
import KPIButton from "../components/KPIButton";

import Spinner from "../components/Spinner";

const Charts = () => {
  const [showKPI, setShowKPI] = useState<boolean>(false);

  const [chartWidth, setChartWidth] = useState<any>(window.innerWidth * 0.75);

  const [chartHeight, setChartHeight] = useState<any>(window.innerHeight * 0.7);

  window.addEventListener("resize", () => {
    setChartWidth(window.innerWidth * 0.75);
    setChartHeight(window.innerHeight * 0.7);
  });

  const dispatch = useDispatch();

  const windowedAverageValue = useSelector(
    (state: RootState) => state.chartsSlice.windowedAverageValue
  );

  const { loading } = useQuery(GET_NEWREPORTSDATA, {
    variables: {
      rollingAverageWindow: windowedAverageValue,
    },
    onCompleted: (d) => dispatch(setNewReports(d.newReportsData)),
  });
  const { loading: loadingPC } = useQuery(GET_NEWREPORTSPERCENTAGECHANGEDATA, {
    variables: {
      rollingAverageWindow: windowedAverageValue,
    },
    onCompleted: (d) =>
      dispatch(setNewReportsPC(d.newReportsPercentageChangeData)),
  });

  return (
    <>
      <MetricButtons />
      <div className={"chart-container"}>
        <div className="chart">
          {showKPI === false ? (
            loading || loadingPC ? (
              <Spinner />
            ) : (
              <Chart width={chartWidth} height={chartHeight} />
            )
          ) : (
            <KPI showKPI={showKPI} mobile={true} setShowKPI={setShowKPI} />
          )}
        </div>
        <div className="buttons-legend">
          <KPI showKPI={showKPI} setShowKPI={setShowKPI} />
          <Legend />
          <div className="mobile-button-container">
            <AverageButtons />
            <KPIButton showKPI={showKPI} setShowKPI={setShowKPI} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
