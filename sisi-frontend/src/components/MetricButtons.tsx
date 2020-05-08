import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../redux/store";
import "../App.css";
import { setMetric } from "../features/charts/chartsSlice";

const MetricButtons = (props: any) => {
  const metric = useSelector((state: RootState) => state.chartsSlice.metric);

  const dispatch = useDispatch();

  return (
    <>
      <div className="button-container-metric">
        <div
          className={
            metric === "newReports" ? "button-metric-selected" : "button-metric"
          }
          onClick={() => {
            dispatch(setMetric("newReports"));
          }}
        >
          New Daily Reported Values
        </div>
        <div
          className={
            metric === "newReportsPercentageChange"
              ? "button-metric-selected"
              : "button-metric"
          }
          onClick={() => {
            dispatch(setMetric("newReportsPercentageChange"));
          }}
        >
          Daily Change on Totals
        </div>
      </div>
    </>
  );
};

export default MetricButtons;
